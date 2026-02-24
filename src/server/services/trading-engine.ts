import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { MAX_SLIPPAGE, PRICE_FLOOR, PRICE_CEILING, MAX_TRADE_SIZE, MIN_TRADE_SIZE } from '@/lib/constants';

// ─── Types ───────────────────────────────────────────────

export interface Pool {
    yes: number;
    no: number;
}

export interface TradeResult {
    shares: number;
    newYesPrice: number;  // Always the YES probability (0-100)
    pool: Pool;
    slippage: number;
    cost: number;
}

export interface SellResult {
    payout: number;
    newYesPrice: number;
    pool: Pool;
}

// ─── Input Validation ────────────────────────────────────

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

// ─── CPMM Core: Buy ─────────────────────────────────────

/**
 * Calculate the result of a buy trade using the Constant Product Market Maker.
 *
 * The invariant is: k = yes_pool * no_pool
 * Buying YES adds to yes_pool, reduces no_pool, user receives NO tokens as shares.
 * Price is always expressed as the probability of the YES outcome (0-100).
 */
export function calculateTrade(
    pool: Pool,
    side: 'YES' | 'NO',
    amount: number
): TradeResult {
    const k = pool.yes * pool.no;

    // Initial YES price as percentage (0-100)
    const initialYesPrice = Math.round((pool.yes / (pool.yes + pool.no)) * 100);

    let newYes: number, newNo: number, shares: number;

    if (side === 'YES') {
        newYes = pool.yes + amount;
        newNo = k / newYes;
        shares = pool.no - newNo;
    } else {
        newNo = pool.no + amount;
        newYes = k / newNo;
        shares = pool.yes - newYes;
    }

    // Always return YES probability as the price
    const newYesPrice = Math.round((newYes / (newYes + newNo)) * 100);

    // Slippage calculation: (Execution Price - Initial Price) / Initial Price
    // Initial Price (marginal) = pool.yes / pool.no (if buying YES)
    // Execution Price = amount / shares
    const initialPrice = side === 'YES'
        ? pool.yes / pool.no
        : pool.no / pool.yes;

    const executionPrice = amount / shares;
    const slippage = Math.abs(executionPrice - initialPrice) / initialPrice;

    // Guard: reject trades with excessive slippage
    if (slippage > MAX_SLIPPAGE) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Trade would cause ${(slippage * 100).toFixed(1)}% slippage. Max allowed: ${MAX_SLIPPAGE * 100}%.`,
        });
    }

    // Guard: price must stay within bounds
    if (newYesPrice < PRICE_FLOOR || newYesPrice > PRICE_CEILING) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Trade would push price outside ${PRICE_FLOOR}-${PRICE_CEILING} bounds.`,
        });
    }

    return {
        shares: Math.floor(shares),
        newYesPrice,
        pool: { yes: newYes, no: newNo },
        slippage,
        cost: amount,
    };
}

// ─── CPMM Core: Sell ─────────────────────────────────────

/**
 * Calculate the result of selling shares back to the AMM pool.
 * Reverses the buy operation: shares go back into the pool, user receives PRED.
 */
export function calculateSell(
    pool: Pool,
    side: 'YES' | 'NO',
    sharesToSell: number
): SellResult {
    const k = pool.yes * pool.no;

    let newYes: number, newNo: number, payout: number;

    if (side === 'YES') {
        // Selling YES shares = adding to NO pool
        newNo = pool.no + sharesToSell;
        newYes = k / newNo;
        payout = pool.yes - newYes;
    } else {
        // Selling NO shares = adding to YES pool
        newYes = pool.yes + sharesToSell;
        newNo = k / newYes;
        payout = pool.no - newNo;
    }

    const newYesPrice = Math.round((newYes / (newYes + newNo)) * 100);

    if (newYesPrice < PRICE_FLOOR || newYesPrice > PRICE_CEILING) {
        throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Sell would push price outside ${PRICE_FLOOR}-${PRICE_CEILING} bounds.`,
        });
    }

    return {
        payout: Math.floor(payout),
        newYesPrice,
        pool: { yes: newYes, no: newNo },
    };
}
