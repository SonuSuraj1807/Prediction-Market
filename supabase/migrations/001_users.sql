-- ============================================================
-- 001_users.sql — Users table with constraints & indexes
-- ============================================================

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone           TEXT UNIQUE,
  email           TEXT UNIQUE,
  display_name    TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 30),
  avatar_url      TEXT,
  balance         INTEGER NOT NULL DEFAULT 1000 CHECK (balance >= 0),
  accuracy_score  FLOAT DEFAULT 0.0,
  total_trades    INTEGER DEFAULT 0 CHECK (total_trades >= 0),
  total_profit    INTEGER DEFAULT 0,
  rank            INTEGER,
  role            TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  is_banned       BOOLEAN DEFAULT FALSE,
  last_daily_topup TIMESTAMPTZ,
  referral_code   TEXT UNIQUE DEFAULT encode(gen_random_bytes(4), 'hex'),
  referred_by     UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_rank ON users(rank) WHERE rank IS NOT NULL;
CREATE INDEX idx_users_accuracy ON users(accuracy_score DESC);
CREATE INDEX idx_users_referral ON users(referral_code);
