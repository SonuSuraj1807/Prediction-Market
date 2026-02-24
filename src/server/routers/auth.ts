import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { UpdateProfileSchema } from '@/lib/validators';

export const authRouter = router({
    /**
     * Get the current session user.
     */
    getSession: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.userId) return null;

        const { data, error } = await ctx.supabase
            .from('users')
            .select('*')
            .eq('id', ctx.userId)
            .single();

        if (error) return null;
        return data;
    }),

    /**
     * Update the current user's profile.
     */
    updateProfile: protectedProcedure
        .input(UpdateProfileSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('users')
                .update({
                    ...(input.displayName && { display_name: input.displayName }),
                    ...(input.avatarUrl && { avatar_url: input.avatarUrl }),
                    updated_at: new Date().toISOString(),
                })
                .eq('id', ctx.userId)
                .select()
                .single();

            if (error) throw error;
            return data;
        }),

    /**
     * Get user by ID (public profile).
     */
    getUser: publicProcedure
        .input(z.object({ userId: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('users')
                .select('id, display_name, avatar_url, accuracy_score, total_trades, total_profit, rank, created_at')
                .eq('id', input.userId)
                .single();

            if (error) return null;
            return data;
        }),
});
