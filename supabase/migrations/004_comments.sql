-- ============================================================
-- 004_comments.sql — Comments table with cascade delete
-- ============================================================

CREATE TABLE comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id   UUID NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id),
  body        TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 2000),
  is_flagged  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_market ON comments(market_id, created_at DESC);
