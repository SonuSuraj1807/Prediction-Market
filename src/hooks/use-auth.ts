'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

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
                .single();
            setUser(data);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [supabase]);

    useEffect(() => {
        fetchUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchUser();
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
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
