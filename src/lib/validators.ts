import { z } from 'zod';
import { CATEGORIES, REGIONS, MAX_TRADE_SIZE, MIN_TRADE_SIZE } from './constants';

// ─── Auth ────────────────────────────────────────────────
export const RegisterSchema = z.object({
    displayName: z.string().min(2).max(30),
    ageConfirmed: z.literal(true, {
        errorMap: () => ({ message: 'You must confirm you are 18 or older' }),
    }),
    consentGiven: z.literal(true, {
        errorMap: () => ({ message: 'You must agree to the privacy policy' }),
    }),
    referralCode: z.string().optional(),
});

export const UpdateProfileSchema = z.object({
    displayName: z.string().min(2).max(30).optional(),
    avatarUrl: z.string().url().optional(),
});

// ─── Trading ─────────────────────────────────────────────
export const TradeInputSchema = z.object({
    marketId: z.string().uuid(),
    side: z.enum(['YES', 'NO']),
    amount: z.number().int().min(MIN_TRADE_SIZE).max(MAX_TRADE_SIZE),
});

export const SellInputSchema = z.object({
    marketId: z.string().uuid(),
    side: z.enum(['YES', 'NO']),
    shares: z.number().int().min(1),
});

// ─── Markets ─────────────────────────────────────────────
export const CreateMarketSchema = z.object({
    title: z.string().min(10).max(200),
    description: z.string().max(2000).optional(),
    category: z.enum(CATEGORIES),
    region: z.enum(REGIONS),
    resolutionSource: z.string().url().optional(),
    resolvesAt: z.string().datetime(),
    isFeatured: z.boolean().default(false),
});

export const MarketFilterSchema = z.object({
    category: z.enum(CATEGORIES).optional(),
    region: z.enum(REGIONS).optional(),
    status: z.enum(['open', 'closed', 'resolved']).optional(),
    search: z.string().max(100).optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(50).default(20),
});

export const ResolveMarketSchema = z.object({
    marketId: z.string().uuid(),
    resolution: z.enum(['YES', 'NO', 'CANCELLED']),
});

// ─── Comments ────────────────────────────────────────────
export const CreateCommentSchema = z.object({
    marketId: z.string().uuid(),
    body: z.string().min(1).max(2000),
});

// ─── Type exports ────────────────────────────────────────
export type TradeInput = z.infer<typeof TradeInputSchema>;
export type SellInput = z.infer<typeof SellInputSchema>;
export type CreateMarket = z.infer<typeof CreateMarketSchema>;
export type MarketFilter = z.infer<typeof MarketFilterSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
