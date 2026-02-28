import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
    /**
     * Get the global leaderboard.
     * Ranked by total balance (virtual PRED coins).
     */
    getLeaderboard: publicProcedure
        .input(z.object({
            limit: z.number().int().min(1).max(100).default(20),
        }))
        .query(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('users')
                .select('id, display_name, avatar_url, balance')
                .order('balance', { ascending: false })
                .limit(input.limit);

            if (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Failed to fetch leaderboard: ${error.message}`,
                });
            }

            return data;
        }),

    /**
     * Get a user's public profile and stats.
     */
    getProfile: publicProcedure
        .input(z.object({ userId: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            // Fetch basic info
            const { data: user, error: userError } = await ctx.supabase
                .from('users')
                .select('*')
                .eq('id', input.userId)
                .single();

            if (userError) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found.',
                });
            }

            // Fetch comprehensive stats
            // 1. Total Trades
            const { count: tradesCount } = await ctx.supabase
                .from('trades')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', input.userId);

            // 2. Net Profit (sum of all cost in trades, negative for buy, positive for sell - simplified)
            // In a real system, this would be more complex (realized vs unrealized)
            // For now, we'll use the pre-calculated field in the users table from migration 001
            const totalProfit = user.total_profit ?? 0;

            // 3. Accuracy / Win Rate
            // Using accuracy_score from users table
            const accuracy = (user.accuracy_score ?? 0) * 100;

            return {
                ...user,
                stats: {
                    tradesCount: tradesCount ?? 0,
                    totalProfit,
                    accuracy,
                    winRate: accuracy > 0 ? Math.min(accuracy + 5, 100) : 0, // Mock win rate based on accuracy
                },
            };
        }),

    /**
     * Get current user's profile.
     */
    me: protectedProcedure.query(async ({ ctx }) => {
        const { data, error } = await ctx.supabase
            .from('users')
            .select('*')
            .eq('id', ctx.userId)
            .single();

        if (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch your profile.',
            });
        }

        return data;
    }),
});
