import { describe, it, expect } from 'vitest';
import { calculateTrade, calculateSell } from '@/server/services/trading-engine';

describe('CPMM Trading Engine', () => {
    const defaultPool = { yes: 1000, no: 1000 };

    // ─── Buy YES ───────────────────────────────────────
    describe('calculateTrade — Buy YES', () => {
        it('should return shares and update price for a basic YES trade', () => {
            const result = calculateTrade(defaultPool, 'YES', 100);

            expect(result.shares).toBeGreaterThan(0);
            expect(result.newYesPrice).toBeGreaterThan(50);
            expect(result.newYesPrice).toBeLessThanOrEqual(99);
            expect(result.pool.yes).toBe(1100);
            expect(result.pool.yes * result.pool.no).toBeCloseTo(1000000, -2); // k ≈ constant
            expect(result.cost).toBe(100);
        });

        it('should calculate correct shares for YES trade', () => {
            // k = 1000 * 1000 = 1,000,000
            // new_yes = 1100, new_no = 1000000/1100 ≈ 909.09
            // shares = 1000 - 909.09 ≈ 90
            const result = calculateTrade(defaultPool, 'YES', 100);
            expect(result.shares).toBe(90); // floor(90.909...)
        });

        it('should increase YES price after buying YES', () => {
            const result = calculateTrade(defaultPool, 'YES', 100);
            expect(result.newYesPrice).toBeGreaterThan(50);
        });
    });

    // ─── Buy NO ────────────────────────────────────────
    describe('calculateTrade — Buy NO', () => {
        it('should return shares and decrease YES price for a NO trade', () => {
            const result = calculateTrade(defaultPool, 'NO', 100);

            expect(result.shares).toBeGreaterThan(0);
            expect(result.newYesPrice).toBeLessThan(50);
            expect(result.newYesPrice).toBeGreaterThanOrEqual(1);
        });

        it('should calculate correct shares for NO trade', () => {
            const result = calculateTrade(defaultPool, 'NO', 100);
            expect(result.shares).toBe(90);
        });
    });

    // ─── Price Consistency ─────────────────────────────
    describe('Price Consistency', () => {
        it('should always return YES probability (not side-dependent)', () => {
            const yesResult = calculateTrade(defaultPool, 'YES', 100);
            const noResult = calculateTrade(defaultPool, 'NO', 100);

            // YES buy → YES price goes UP
            expect(yesResult.newYesPrice).toBeGreaterThan(50);
            // NO buy → YES price goes DOWN
            expect(noResult.newYesPrice).toBeLessThan(50);
            // They should be symmetric
            expect(yesResult.newYesPrice + noResult.newYesPrice).toBe(100);
        });
    });

    // ─── Safety Guards ─────────────────────────────────
    describe('Safety Guards', () => {
        it('should reject trades with excessive slippage', () => {
            // Very large trade on a small pool = high slippage
            const smallPool = { yes: 100, no: 100 };
            expect(() => calculateTrade(smallPool, 'YES', 500)).toThrow(/slippage/i);
        });

        it('should reject trades that push price out of bounds', () => {
            // Trade on an already lopsided pool
            const lopsidedPool = { yes: 50, no: 20000 };
            expect(() => calculateTrade(lopsidedPool, 'NO', 400)).toThrow(/bounds/i);
        });
    });

    // ─── Sell ──────────────────────────────────────────
    describe('calculateSell', () => {
        it('should return correct payout when selling YES shares', () => {
            // First buy, then sell
            const buyResult = calculateTrade(defaultPool, 'YES', 100);
            const sellResult = calculateSell(buyResult.pool, 'YES', buyResult.shares);

            expect(sellResult.payout).toBeGreaterThan(0);
            expect(sellResult.payout).toBeLessThanOrEqual(100); // Can't profit more than pool
            expect(sellResult.newYesPrice).toBeLessThan(buyResult.newYesPrice); // Price drops on sell
        });

        it('should reverse price direction on sell', () => {
            const afterBuy = calculateTrade(defaultPool, 'YES', 50);
            const afterSell = calculateSell(afterBuy.pool, 'YES', afterBuy.shares);

            // Selling should push price back toward 50
            expect(afterSell.newYesPrice).toBeLessThan(afterBuy.newYesPrice);
        });

        it('should reject sells that push price out of bounds', () => {
            const extremePool = { yes: 50, no: 20000 };
            expect(() => calculateSell(extremePool, 'NO', 19000)).toThrow(/bounds/i);
        });
    });

    // ─── Edge Cases ────────────────────────────────────
    describe('Edge Cases', () => {
        it('should handle minimum trade size (1 PRED)', () => {
            const result = calculateTrade(defaultPool, 'YES', 1);
            expect(result.shares).toBeGreaterThanOrEqual(0);
            expect(result.newYesPrice).toBeGreaterThanOrEqual(50);
        });

        it('should handle sequential trades correctly', () => {
            const trade1 = calculateTrade(defaultPool, 'YES', 50);
            const trade2 = calculateTrade(trade1.pool, 'YES', 50);

            // Second trade should give fewer shares (price moved against us)
            expect(trade2.shares).toBeLessThan(trade1.shares);
            // Price should be higher after second trade
            expect(trade2.newYesPrice).toBeGreaterThan(trade1.newYesPrice);
        });
    });
});
