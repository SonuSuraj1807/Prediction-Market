import { router, adminProcedure } from '../trpc';
import { CreateMarketSchema, ResolveMarketSchema } from '@/lib/validators';
import { TRPCError } from '@trpc/server';

export const adminRouter = router({
    /**
     * Create a new prediction market.
     */
    createMarket: adminProcedure
        .input(CreateMarketSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('markets')
                .insert({
                    title: input.title,
                    description: input.description,
                    category: input.category,
                    region: input.region,
                    resolution_source: input.resolutionSource,
                    resolves_at: input.resolvesAt,
                    is_featured: input.isFeatured,
                    created_by: ctx.userId,
                })
                .select()
                .single();

            if (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Failed to create market: ${error.message}`,
                });
            }

            return data;
        }),

    /**
     * Resolve a market (YES, NO, or CANCELLED).
     * Calls the atomic resolve_market stored procedure.
     */
    resolveMarket: adminProcedure
        .input(ResolveMarketSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase.rpc('resolve_market', {
                p_market_id: input.marketId,
                p_resolution: input.resolution,
                p_admin_id: ctx.userId,
            });

            if (error) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: `Failed to resolve market: ${error.message}`,
                });
            }

            return data;
        }),

    /**
     * Get all markets for admin management.
     */
    getAllMarkets: adminProcedure.query(async ({ ctx }) => {
        const { data, error } = await ctx.supabase
            .from('markets')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: `Failed to fetch markets: ${error.message}`,
            });
        }

        return data;
    }),
});
