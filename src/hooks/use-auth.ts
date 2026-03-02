'use client';

import { useEffect, useState, useCallback } from 'react'; // These imports are still necessary for the hook's functionality
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
// The 'Loader2' import from 'lucide-react' was in the provided snippet but is not used in the current code.
// If it was intended to be used, it should be added. For now, I'll keep the original imports as they are used.

type User = Database['public']['Tables']['users']['Row'];

export function useAuth() {
    const [session, setSession] = useState<any>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchUser = useCallback(async (userId: string) => {
        const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .maybeSingle();
        if (data) {
            setUser(data);
        }
    }, [supabase]);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            const { data: { session: initialSession } } = await supabase.auth.getSession();
            if (mounted) {
                setSession(initialSession);
                if (initialSession?.user) {
                    await fetchUser(initialSession.user.id);
                }
                setLoading(false);
            }
        };
        init();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (mounted) {
                setSession(newSession);
                if (newSession?.user) {
                    fetchUser(newSession.user.id);
                } else {
                    setUser(null);
                }
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [fetchUser, supabase]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        window.location.href = '/';
    };

    // Robust display name fallback for when the users table hasn't synced yet
    const displayName = user?.display_name || session?.user?.email?.split('@')[0] || 'User';

    return {
        user: user ? { ...user, display_name: displayName } : (session?.user ? { id: session.user.id, display_name: displayName, balance: 0 } : null),
        loading,
        isAuthenticated: !!session?.user,
        isAdmin: user?.role === 'admin',
        signOut,
        refresh: () => session?.user && fetchUser(session.user.id),
    };
}
