import { router, publicProcedure, adminProcedure } from '../trpc';
import { z } from 'zod';
import { CreateMarketSchema, MarketFilterSchema, ResolveMarketSchema } from '@/lib/validators';

export const marketRouter = router({
    /**
     * List markets with filters, pagination, and search.
     */
    list: publicProcedure
        .input(MarketFilterSchema)
        .query(async ({ ctx, input }) => {
            let query = ctx.supabase
                .from('markets')
                .select('*', { count: 'exact' });

            if (input.category) query = query.eq('category', input.category);
            if (input.region) {
                if (input.region === 'global') {
                    query = query.eq('region', 'global');
                } else {
                    query = query.or(`region.eq.${input.region},region.eq.global`);
                }
            }
            if (input.status) query = query.eq('status', input.status);
            if (input.search) query = query.ilike('title', `%${input.search}%`);

            const offset = (input.page - 1) * input.limit;
            query = query
                .order('is_featured', { ascending: false })
                .order('total_volume', { ascending: false })
                .range(offset, offset + input.limit - 1);

            const { data, count, error } = await query;
            if (error) {
                console.error('Market List Error:', error);
                throw error;
            }

            return {
                markets: data ?? [],
                total: count ?? 0,
                page: input.page,
                totalPages: Math.ceil((count ?? 0) / input.limit),
            };
        }),

    /**
     * Get a single market by ID.
     */
    getById: publicProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('markets')
                .select('*')
                .eq('id', input.id)
                .single();

            if (error) throw error;
            return data;
        }),

    /**
     * Create a new market (admin only).
     */
    create: adminProcedure
        .input(CreateMarketSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase
                .from('markets')
                .insert({
                    title: input.title,
                    description: input.description ?? null,
                    category: input.category,
                    region: input.region,
                    resolution_source: input.resolutionSource ?? null,
                    resolves_at: input.resolvesAt,
                    is_featured: input.isFeatured,
                    created_by: ctx.userId,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        }),

    /**
     * Resolve a market (admin only).
     */
    resolve: adminProcedure
        .input(ResolveMarketSchema)
        .mutation(async ({ ctx, input }) => {
            const { data, error } = await ctx.supabase.rpc('resolve_market', {
                p_market_id: input.marketId,
                p_resolution: input.resolution,
                p_admin_id: ctx.userId,
            });

            if (error) throw error;
            return data;
        }),

    /**
     * Get trending markets (top 10 by volume).
     */
    trending: publicProcedure.query(async ({ ctx }) => {
        const { data, error } = await ctx.supabase
            .from('markets')
            .select('*')
            .eq('status', 'open')
            .order('total_volume', { ascending: false })
            .limit(10);

        if (error) throw error;
        return data ?? [];
    }),
});
