-- ============================================================
-- 005_rls_policies.sql — Row-Level Security for all tables
-- ============================================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- ─── Users ───────────────────────────────────────────────
CREATE POLICY "Users are viewable by everyone"
  ON users FOR SELECT USING (true);

CREATE POLICY "Users can update own record"
  ON users FOR UPDATE USING (auth.uid() = id);

-- ─── Markets ─────────────────────────────────────────────
CREATE POLICY "Markets are viewable by everyone"
  ON markets FOR SELECT USING (true);

CREATE POLICY "Admins can create markets"
  ON markets FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update markets"
  ON markets FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── Positions ───────────────────────────────────────────
CREATE POLICY "Users can view own positions"
  ON positions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role manages positions"
  ON positions FOR ALL USING (auth.role() = 'service_role');

-- ─── Trades ──────────────────────────────────────────────
CREATE POLICY "Users can view own trades"
  ON trades FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role inserts trades"
  ON trades FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ─── Comments ────────────────────────────────────────────
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment"
  ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments or admin/mod"
  ON comments FOR DELETE USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
  );
