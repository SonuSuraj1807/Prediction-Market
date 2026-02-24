-- ============================================================
-- 002_markets.sql — Markets table with category/region enums
-- ============================================================

CREATE TABLE markets (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL CHECK (char_length(title) BETWEEN 10 AND 200),
  description       TEXT,
  category          TEXT NOT NULL CHECK (category IN (
                      'economy', 'sports', 'tech', 'climate', 'policy', 'global', 'entertainment'
                    )),
  region            TEXT NOT NULL DEFAULT 'india' CHECK (region IN (
                      'india', 'usa', 'europe', 'asia', 'global'
                    )),
  flag              TEXT,
  tag               TEXT,
  resolution_source TEXT,
  yes_pool          INTEGER NOT NULL DEFAULT 1000 CHECK (yes_pool > 0),
  no_pool           INTEGER NOT NULL DEFAULT 1000 CHECK (no_pool > 0),
  yes_price         INTEGER NOT NULL DEFAULT 50 CHECK (yes_price BETWEEN 1 AND 99),
  total_volume      INTEGER NOT NULL DEFAULT 0 CHECK (total_volume >= 0),
  trader_count      INTEGER NOT NULL DEFAULT 0 CHECK (trader_count >= 0),
  created_by        UUID NOT NULL REFERENCES users(id),
  resolves_at       TIMESTAMPTZ NOT NULL,
  resolved_at       TIMESTAMPTZ,
  resolution        TEXT CHECK (resolution IN ('YES', 'NO', 'CANCELLED')),
  status            TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'resolved')),
  is_featured       BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_markets_status ON markets(status);
CREATE INDEX idx_markets_category ON markets(category);
CREATE INDEX idx_markets_resolves_at ON markets(resolves_at) WHERE status = 'open';
CREATE INDEX idx_markets_featured ON markets(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_markets_trending ON markets(total_volume DESC, trader_count DESC);
