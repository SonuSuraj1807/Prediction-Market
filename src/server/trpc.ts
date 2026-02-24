import { initTRPC, TRPCError } from '@trpc/server';
import { createServiceClient } from '@/lib/supabase/server';

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
 * In a real setup, this extracts the user from the JWT cookie.
 */
export async function createContext(opts: { headers: Headers }): Promise<Context> {
    const supabase = createServiceClient();

    // Extract user from Authorization header or cookie
    const authHeader = opts.headers.get('authorization');
    let userId: string | null = null;
    let userRole: string | null = null;

    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        const { data: { user } } = await supabase.auth.getUser(token);
        if (user) {
            userId = user.id;
            // Fetch role from users table
            const { data } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single();
            userRole = data?.role ?? 'user';
        }
    }

    return { supabase, userId, userRole };
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
