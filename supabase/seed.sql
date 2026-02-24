-- ============================================================
-- seed.sql — Development seed data
-- ============================================================

-- Insert test users
INSERT INTO users (id, email, display_name, balance, role) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'admin@eventix.in', 'Admin', 10000, 'admin'),
  ('a0000000-0000-0000-0000-000000000002', 'trader1@example.com', 'TraderOne', 1000, 'user'),
  ('a0000000-0000-0000-0000-000000000003', 'trader2@example.com', 'TraderTwo', 1000, 'user');

-- Insert sample markets across categories
INSERT INTO markets (title, description, category, region, created_by, resolves_at, is_featured) VALUES
  ('Will RBI cut interest rates in Q2 2026?', 'Prediction on whether the Reserve Bank of India will reduce repo rate in April-June 2026.', 'economy', 'india', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '90 days', TRUE),
  ('Will India win the ICC Champions Trophy 2026?', 'India''s performance in the upcoming ICC Champions Trophy tournament.', 'sports', 'india', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '60 days', TRUE),
  ('Will ChatGPT-5 be released before July 2026?', 'Whether OpenAI releases GPT-5 to the public before July 1, 2026.', 'tech', 'global', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '120 days', FALSE),
  ('Will global temperatures exceed 1.5°C above pre-industrial levels in 2026?', 'Based on official NOAA/NASA annual reports.', 'climate', 'global', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '300 days', FALSE),
  ('Will the US Federal Reserve cut rates before June 2026?', 'Federal Open Market Committee decision on federal funds rate.', 'economy', 'usa', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '90 days', FALSE),
  ('Will ISRO launch Chandrayaan-4 in 2026?', 'India''s next lunar mission launch timeline.', 'tech', 'india', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '300 days', TRUE),
  ('Will Sensex cross 100,000 by end of 2026?', 'BSE Sensex reaching the 1 lakh milestone.', 'economy', 'india', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '300 days', TRUE),
  ('Will a new COVID variant cause global lockdowns in 2026?', 'WHO declaration of a new variant of concern leading to lockdowns.', 'policy', 'global', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '300 days', FALSE),
  ('Will any Bollywood film cross ₹2000 Cr worldwide in 2026?', 'Box office collection milestone for Indian cinema.', 'entertainment', 'india', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '300 days', FALSE),
  ('Will the EU pass a comprehensive AI regulation act in 2026?', 'European Parliament vote on AI Act enforcement.', 'policy', 'europe', 'a0000000-0000-0000-0000-000000000001', NOW() + INTERVAL '300 days', FALSE);
