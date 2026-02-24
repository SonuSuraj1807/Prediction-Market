/**
 * Application constants — single source of truth for magic numbers.
 */

// ─── Virtual Currency ────────────────────────────────────
export const INITIAL_BALANCE = 1000;       // PRED coins on registration
export const DAILY_TOPUP = 50;             // Free daily top-up
export const REFERRAL_BONUS = 500;         // Both referrer + referred

// ─── Trading Guards ──────────────────────────────────────
export const MAX_TRADE_SIZE = 500;         // Max PRED per single trade
export const MIN_TRADE_SIZE = 1;           // Min PRED per single trade
export const MAX_SLIPPAGE = 0.20;          // 20% slippage limit
export const PRICE_FLOOR = 1;             // Min price (probability %)
export const PRICE_CEILING = 99;           // Max price (probability %)

// ─── CPMM Defaults ──────────────────────────────────────
export const DEFAULT_POOL_SIZE = 1000;     // Initial YES/NO pool
export const DEFAULT_PRICE = 50;           // Initial price (50/50)

// ─── Rate Limiting ───────────────────────────────────────
export const TRADES_PER_MINUTE = 10;
export const API_REQUESTS_PER_MINUTE = 60;

// ─── Leaderboard ─────────────────────────────────────────
export const MIN_TRADES_FOR_LEADERBOARD = 5;
export const LEADERBOARD_REFRESH_INTERVAL_MS = 15 * 60 * 1000; // 15 min

// ─── Categories & Regions ────────────────────────────────
export const CATEGORIES = [
    'economy', 'sports', 'tech', 'climate', 'policy', 'global', 'entertainment',
] as const;

export const REGIONS = [
    'india', 'usa', 'europe', 'asia', 'global',
] as const;

export type Category = typeof CATEGORIES[number];
export type Region = typeof REGIONS[number];

// ─── App Meta ────────────────────────────────────────────
export const APP_NAME = 'Eventix';
export const APP_DESCRIPTION = 'Trade on real-world events with virtual currency. Test your prediction skills.';
export const APP_URL = 'https://eventix.in';
