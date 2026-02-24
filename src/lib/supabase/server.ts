import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client with service_role key.
 * Used by the trading engine to bypass RLS for atomic operations.
 * NEVER expose this on the client side.
 */
export function createServiceClient() {
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}
