import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { TradeInputSchema, SellInputSchema } from '@/lib/validators';

export const tradeRouter = router({
    /**
     * Buy shares (YES or NO) on a market.
     * Calls the atomic execute_trade() stored procedure.
     */
    buy: protectedProcedure
        .input(TradeInputSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase.rpc('execute_trade', {
                p_user_id: ctx.userId,
                p_market_id: input.marketId,
                p_side: input.side,
                p_amount: input.amount,
            });

            if (error) throw error;
            return data;
        }),

    /**
     * Sell shares back to the AMM.
     * Calls the atomic execute_sell() stored procedure.
     */
    sell: protectedProcedure
        .input(SellInputSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase.rpc('execute_sell', {
                p_user_id: ctx.userId,
                p_market_id: input.marketId,
                p_side: input.side,
                p_shares: input.shares,
            });

            if (error) throw error;
            return data;
        }),

    /**
     * Get trade history for a market.
     */
    getHistory: protectedProcedure
        .input(z.object({
            marketId: z.string().uuid(),
            limit: z.number().int().min(1).max(100).default(50),
        }))
        .query(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('trades')
                .select('*')
                .eq('market_id', input.marketId)
                .order('created_at', { ascending: false })
                .limit(input.limit);

            if (error) throw error;
            return data ?? [];
        }),

    /**
     * Get user's positions across all markets.
     */
    getPositions: protectedProcedure.query(async ({ ctx }) => {
        const { data, error } = await ctx.supabase
            .from('positions')
            .select(`
        *,
        markets:market_id (
          id, title, yes_price, status, resolution
        )
      `)
            .eq('user_id', ctx.userId);

        if (error) throw error;
        return data ?? [];
    }),
});
