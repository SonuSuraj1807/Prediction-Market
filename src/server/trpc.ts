import { initTRPC, TRPCError } from '@trpc/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

/**
 * tRPC context — attached to every procedure call.
 * Provides the Supabase service client and current user info.
 */
export interface Context {
    supabase: ReturnType<typeof createServiceClient>;
    userId: string | null;
    userRole: string | null;
}

/**
 * Create context for each tRPC request.
 * Uses Supabase SSR to extract the user from cookies.
 */
export async function createContext(_opts: { headers: Headers }): Promise<Context> {
    try {
        const serviceClient = createServiceClient();
        const cookieClient = await createClient();

        const { data: { user } } = await cookieClient.auth.getUser();

        let userId: string | null = null;
        let userRole: string | null = null;

        if (user) {
            userId = user.id;
            // Fetch role from users table using service client
            const { data: profile } = await serviceClient
                .from('users')
                .select('role')
                .eq('id', user.id)
                .maybeSingle();

            if (profile) {
                userRole = profile.role ?? 'user';
            } else {
                // Profile doesn't exist yet (trigger may have failed/delayed).
                // Create it defensively so FK constraints don't break trades.
                const displayName =
                    user.user_metadata?.display_name ??
                    user.user_metadata?.full_name ??
                    user.email?.split('@')[0] ??
                    `User_${user.id.slice(0, 8)}`;

                await serviceClient
                    .from('users')
                    .upsert({
                        id: user.id,
                        email: user.email ?? '',
                        display_name: displayName.length >= 2 ? displayName : displayName + '_UX',
                    }, { onConflict: 'id' });

                userRole = 'user';
            }
        }

        return { supabase: serviceClient, userId, userRole };
    } catch (error) {
        console.error('TRPC createContext Error:', error);
        return {
            supabase: createServiceClient(),
            userId: null,
            userRole: null
        };
    }
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected procedure — requires authenticated user.
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to perform this action.',
        });
    }
    return next({
        ctx: {
            ...ctx,
            userId: ctx.userId,
            userRole: ctx.userRole!,
        },
    });
});

/**
 * Admin procedure — requires admin role.
 */
export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not logged in.' });
    }
    if (ctx.userRole !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required.' });
    }
    return next({
        ctx: {
            ...ctx,
            userId: ctx.userId,
            userRole: 'admin' as const,
        },
    });
});
