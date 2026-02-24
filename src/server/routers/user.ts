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

            // Fetch positions count and volume (simplified for now)
            const { count: tradesCount } = await ctx.supabase
                .from('trades')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', input.userId);

            return {
                ...user,
                stats: {
                    tradesCount: tradesCount ?? 0,
                    // ROI and Win Rate would require more complex aggregation queries
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
