-- ============================================================
-- 006_functions.sql — Stored procedures for atomic operations
-- ============================================================

-- ─── Execute Trade (Buy) ─────────────────────────────────
-- Atomic trade execution with row-level locking to prevent race conditions.
-- FIX: trader_count now uses DISTINCT check instead of blind increment.
CREATE OR REPLACE FUNCTION execute_trade(
  p_user_id UUID,
  p_market_id UUID,
  p_side TEXT,
  p_amount INTEGER
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_market RECORD;
  v_k BIGINT;
  v_new_yes INTEGER;
  v_new_no INTEGER;
  v_shares INTEGER;
  v_new_price INTEGER;
  v_user_balance INTEGER;
  v_is_new_trader BOOLEAN;
BEGIN
  -- Lock market row to prevent concurrent modifications
  SELECT * INTO v_market FROM markets WHERE id = p_market_id FOR UPDATE;

  IF v_market IS NULL THEN
    RAISE EXCEPTION 'Market not found';
  END IF;

  IF v_market.status != 'open' THEN
    RAISE EXCEPTION 'Market is not open for trading';
  END IF;

  -- Check user balance
  SELECT balance INTO v_user_balance FROM users WHERE id = p_user_id FOR UPDATE;
  IF v_user_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;

  -- CPMM calculation
  v_k := v_market.yes_pool::BIGINT * v_market.no_pool::BIGINT;

  IF p_side = 'YES' THEN
    v_new_yes := v_market.yes_pool + p_amount;
    v_new_no  := (v_k / v_new_yes)::INTEGER;
    v_shares  := v_market.no_pool - v_new_no;
  ELSE
    v_new_no  := v_market.no_pool + p_amount;
    v_new_yes := (v_k / v_new_no)::INTEGER;
    v_shares  := v_market.yes_pool - v_new_yes;
  END IF;

  -- Always calculate yes_price consistently (probability of YES outcome)
  v_new_price := ROUND((v_new_yes::FLOAT / (v_new_yes + v_new_no)) * 100)::INTEGER;

  -- Guard: price must stay within bounds
  IF v_new_price < 1 OR v_new_price > 99 THEN
    RAISE EXCEPTION 'Trade would push price outside 1-99 bounds';
  END IF;

  -- Check if user is a new trader on this market (FIX: accurate trader_count)
  v_is_new_trader := NOT EXISTS (
    SELECT 1 FROM trades WHERE user_id = p_user_id AND market_id = p_market_id LIMIT 1
  );

  -- Apply changes atomically
  UPDATE users SET
    balance = balance - p_amount,
    total_trades = total_trades + 1,
    updated_at = NOW()
  WHERE id = p_user_id;

  UPDATE markets SET
    yes_pool = v_new_yes,
    no_pool = v_new_no,
    yes_price = v_new_price,
    total_volume = total_volume + p_amount,
    trader_count = trader_count + CASE WHEN v_is_new_trader THEN 1 ELSE 0 END,
    updated_at = NOW()
  WHERE id = p_market_id;

  INSERT INTO positions (user_id, market_id, side, shares, avg_price, total_cost)
    VALUES (p_user_id, p_market_id, p_side, v_shares, v_new_price, p_amount)
    ON CONFLICT (user_id, market_id, side) DO UPDATE SET
      shares = positions.shares + EXCLUDED.shares,
      avg_price = ROUND(
        (positions.total_cost + EXCLUDED.total_cost)::FLOAT /
        (positions.shares + EXCLUDED.shares)
      )::INTEGER,
      total_cost = positions.total_cost + EXCLUDED.total_cost,
      updated_at = NOW();

  INSERT INTO trades (user_id, market_id, side, action, shares, price, cost)
    VALUES (p_user_id, p_market_id, p_side, 'buy', v_shares, v_new_price, p_amount);

  RETURN jsonb_build_object(
    'shares', v_shares,
    'price', v_new_price,
    'cost', p_amount,
    'new_balance', v_user_balance - p_amount
  );
END;
$$;


-- ─── Execute Sell (NEW — missing from original plan) ─────
-- Allows users to sell shares back to the AMM pool.
CREATE OR REPLACE FUNCTION execute_sell(
  p_user_id UUID,
  p_market_id UUID,
  p_side TEXT,
  p_shares INTEGER
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_market RECORD;
  v_position RECORD;
  v_k BIGINT;
  v_new_yes INTEGER;
  v_new_no INTEGER;
  v_new_price INTEGER;
  v_payout INTEGER;
BEGIN
  -- Lock market row
  SELECT * INTO v_market FROM markets WHERE id = p_market_id FOR UPDATE;

  IF v_market IS NULL THEN
    RAISE EXCEPTION 'Market not found';
  END IF;

  IF v_market.status != 'open' THEN
    RAISE EXCEPTION 'Market is not open for trading';
  END IF;

  -- Check user has sufficient shares
  SELECT * INTO v_position FROM positions
    WHERE user_id = p_user_id AND market_id = p_market_id AND side = p_side
    FOR UPDATE;

  IF v_position IS NULL OR v_position.shares < p_shares THEN
    RAISE EXCEPTION 'Insufficient shares to sell';
  END IF;

  -- Reverse CPMM: add shares back to pool, remove liquidity
  v_k := v_market.yes_pool::BIGINT * v_market.no_pool::BIGINT;

  IF p_side = 'YES' THEN
    v_new_no  := v_market.no_pool + p_shares;
    v_new_yes := (v_k / v_new_no)::INTEGER;
    v_payout  := v_market.yes_pool - v_new_yes;
  ELSE
    v_new_yes := v_market.yes_pool + p_shares;
    v_new_no  := (v_k / v_new_yes)::INTEGER;
    v_payout  := v_market.no_pool - v_new_no;
  END IF;

  -- Always return yes_price consistently
  v_new_price := ROUND((v_new_yes::FLOAT / (v_new_yes + v_new_no)) * 100)::INTEGER;

  IF v_new_price < 1 OR v_new_price > 99 THEN
    RAISE EXCEPTION 'Sell would push price outside 1-99 bounds';
  END IF;

  -- Update user balance (receive payout)
  UPDATE users SET
    balance = balance + v_payout,
    updated_at = NOW()
  WHERE id = p_user_id;

  -- Update market pools
  UPDATE markets SET
    yes_pool = v_new_yes,
    no_pool = v_new_no,
    yes_price = v_new_price,
    total_volume = total_volume + v_payout,
    updated_at = NOW()
  WHERE id = p_market_id;

  -- Update or remove position
  IF v_position.shares - p_shares <= 0 THEN
    DELETE FROM positions WHERE id = v_position.id;
  ELSE
    UPDATE positions SET
      shares = shares - p_shares,
      total_cost = ROUND(total_cost::FLOAT * (1.0 - p_shares::FLOAT / v_position.shares))::INTEGER,
      updated_at = NOW()
    WHERE id = v_position.id;
  END IF;

  -- Record the sell trade
  INSERT INTO trades (user_id, market_id, side, action, shares, price, cost)
    VALUES (p_user_id, p_market_id, p_side, 'sell', p_shares, v_new_price, v_payout);

  RETURN jsonb_build_object(
    'payout', v_payout,
    'price', v_new_price,
    'shares_sold', p_shares
  );
END;
$$;


-- ─── Resolve Market ──────────────────────────────────────
-- Settles all positions: winners get proportional payout.
CREATE OR REPLACE FUNCTION resolve_market(
  p_market_id UUID,
  p_resolution TEXT,  -- 'YES', 'NO', or 'CANCELLED'
  p_admin_id UUID
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_market RECORD;
  v_position RECORD;
  v_total_pool INTEGER;
  v_payout INTEGER;
  v_settled_count INTEGER := 0;
BEGIN
  -- Verify admin
  IF NOT EXISTS (SELECT 1 FROM users WHERE id = p_admin_id AND role = 'admin') THEN
    RAISE EXCEPTION 'Only admins can resolve markets';
  END IF;

  SELECT * INTO v_market FROM markets WHERE id = p_market_id FOR UPDATE;

  IF v_market.status != 'open' AND v_market.status != 'closed' THEN
    RAISE EXCEPTION 'Market is already resolved';
  END IF;

  v_total_pool := v_market.yes_pool + v_market.no_pool;

  -- Resolve market
  UPDATE markets SET
    status = 'resolved',
    resolution = p_resolution,
    resolved_at = NOW(),
    updated_at = NOW()
  WHERE id = p_market_id;

  -- Settle positions
  IF p_resolution = 'CANCELLED' THEN
    -- Refund everyone their total_cost
    FOR v_position IN SELECT * FROM positions WHERE market_id = p_market_id LOOP
      UPDATE users SET balance = balance + v_position.total_cost WHERE id = v_position.user_id;
      v_settled_count := v_settled_count + 1;
    END LOOP;
  ELSE
    -- Pay winners: each share worth 100 PRED
    FOR v_position IN
      SELECT * FROM positions WHERE market_id = p_market_id AND side = p_resolution
    LOOP
      v_payout := v_position.shares * 100;
      UPDATE users SET
        balance = balance + v_payout,
        total_profit = total_profit + (v_payout - v_position.total_cost),
        updated_at = NOW()
      WHERE id = v_position.user_id;
      v_settled_count := v_settled_count + 1;
    END LOOP;
  END IF;

  -- Clean up positions
  DELETE FROM positions WHERE market_id = p_market_id;

  RETURN jsonb_build_object(
    'market_id', p_market_id,
    'resolution', p_resolution,
    'settled_positions', v_settled_count
  );
END;
$$;
