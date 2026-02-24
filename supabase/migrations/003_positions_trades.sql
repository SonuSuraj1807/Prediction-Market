-- ============================================================
-- 003_positions_trades.sql — Positions & Trades tables
-- ============================================================

CREATE TABLE positions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id),
  market_id   UUID NOT NULL REFERENCES markets(id),
  side        TEXT NOT NULL CHECK (side IN ('YES', 'NO')),
  shares      INTEGER NOT NULL CHECK (shares > 0),
  avg_price   INTEGER NOT NULL CHECK (avg_price BETWEEN 1 AND 99),
  total_cost  INTEGER NOT NULL CHECK (total_cost > 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, market_id, side)
);

CREATE INDEX idx_positions_user ON positions(user_id);
CREATE INDEX idx_positions_market ON positions(market_id);

CREATE TABLE trades (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id),
  market_id   UUID NOT NULL REFERENCES markets(id),
  side        TEXT NOT NULL CHECK (side IN ('YES', 'NO')),
  action      TEXT NOT NULL DEFAULT 'buy' CHECK (action IN ('buy', 'sell')),
  shares      INTEGER NOT NULL CHECK (shares > 0),
  price       INTEGER NOT NULL CHECK (price BETWEEN 1 AND 99),
  cost        INTEGER NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_trades_user ON trades(user_id);
CREATE INDEX idx_trades_market ON trades(market_id);
CREATE INDEX idx_trades_created ON trades(created_at DESC);
