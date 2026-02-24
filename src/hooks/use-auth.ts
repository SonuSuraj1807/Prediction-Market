'use client';

import { useEffect, useState, useCallback } from 'react'; // These imports are still necessary for the hook's functionality
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';
// The 'Loader2' import from 'lucide-react' was in the provided snippet but is not used in the current code.
// If it was intended to be used, it should be added. For now, I'll keep the original imports as they are used.

type User = Database['public']['Tables']['users']['Row'];

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchUser = useCallback(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const { data } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single(); // Kept .single() as it's crucial for the data type.
            setUser(data);
        } else {
            setUser(null);
        }
    }, [supabase]);

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            await fetchUser();
            if (mounted) setLoading(false);
        };
        init();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchUser();
            } else {
                setUser(null);
                if (mounted) setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [fetchUser, supabase]);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        window.location.href = '/';
    };

    return {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        signOut,
        refresh: fetchUser,
    };
}
