'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PortfolioPage() {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (isAuthenticated && user?.id) {
                router.replace(`/profile/${user.id}`);
            } else if (!isAuthenticated) {
                router.replace('/login');
            }
        }
    }, [user, loading, isAuthenticated, router]);

    return (
        <div className="min-h-screen flex flex-col bg-surface transition-colors">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                    <Loader2 className="relative w-16 h-16 text-primary animate-spin" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-black text-text uppercase tracking-tighter">Entering Portfolio</h2>
                    <p className="text-text-muted max-w-xs mx-auto">Heading to your personalized trading dashboard...</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
