-- ============================================================
-- 007_materialised_views.sql — Leaderboard view + refresh
-- ============================================================

DROP MATERIALIZED VIEW IF EXISTS leaderboard CASCADE;

CREATE MATERIALIZED VIEW leaderboard AS
  SELECT
    id AS user_id,
    display_name,
    avatar_url,
    accuracy_score,
    total_profit,
    total_trades,
    RANK() OVER (ORDER BY accuracy_score DESC, total_profit DESC) AS rank
  FROM users
  WHERE total_trades >= 5 AND is_banned = FALSE
  ORDER BY rank;

CREATE UNIQUE INDEX idx_leaderboard_user ON leaderboard(user_id);

-- Refresh function (called by cron or triggered manually)
CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard;
  -- Sync ranks back to users table
  UPDATE users u SET rank = lb.rank
    FROM leaderboard lb WHERE u.id = lb.user_id;
END;
$$;
