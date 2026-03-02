'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { trpc } from '@/utils/trpc';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { TradeHistory } from '@/components/profile/TradeHistory';
import { PortfolioChart } from '@/components/profile/PortfolioChart';
import { HoldingsList } from '@/components/profile/HoldingsList';
import { Loader2, Calendar, ShieldCheck, Wallet, History, LayoutGrid } from 'lucide-react';
import { formatDate, formatPred } from '@/lib/utils';

export default function ProfilePage() {
    const params = useParams();
    const userId = params.userId as string;
    const { user: currentUser, loading: authLoading } = useAuth();
    const isOwnProfile = currentUser?.id === userId;

    const { data: profile, isLoading, error } = trpc.user.getProfile.useQuery(
        { userId },
        {
            // If it's our own profile and it's missing, poll every second until it appears
            refetchInterval: (data) => (!data && isOwnProfile) ? 1000 : false,
        }
    );

    if (isLoading || authLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-surface transition-colors">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !profile) {
        if (isOwnProfile && !error) {
            return (
                <div className="min-h-screen flex flex-col bg-surface transition-colors">
                    <Navbar />
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                            <Loader2 className="relative w-16 h-16 text-primary animate-spin" />
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-black text-text uppercase tracking-tighter">Setting up your profile</h2>
                            <p className="text-text-muted max-w-xs mx-auto">We're initializing your predictor account. This will only take a moment...</p>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }

        return (
            <div className="min-h-screen flex flex-col bg-surface transition-colors">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <div className="text-4xl">👤🚫</div>
                    <h2 className="text-2xl font-bold text-text">Profile Not Found</h2>
                    <p className="text-text-muted">The user you are looking for does not exist or has been removed.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-surface transition-colors">
            <Navbar />

            <main className="flex-1 container-polymarket py-12 space-y-12">
                {/* ─── Profile Header ────────────────────────── */}
                <div className="flex flex-col lg:flex-row items-stretch gap-6">
                    {/* User Info Card */}
                    <div className="flex-1 flex flex-col md:flex-row items-center gap-8 card-modern p-8 bg-surface/50">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-4xl text-primary font-bold overflow-hidden border border-border">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} alt={profile.display_name} className="w-full h-full object-cover" />
                            ) : (
                                profile.display_name.slice(0, 1).toUpperCase()
                            )}
                        </div>

                        <div className="text-center md:text-left space-y-3">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <h1 className="text-3xl font-extrabold text-text tracking-tight uppercase leading-none">
                                    {profile.display_name}
                                </h1>
                                {profile.role === 'admin' && (
                                    <div className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                                        Staff
                                    </div>
                                )}
                                <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded text-[10px] font-bold text-primary uppercase tracking-widest">
                                    Verified
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[10px] text-text-muted font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 opacity-50" />
                                    Since {formatDate(profile.created_at)}
                                </div>
                                <div className="flex items-center gap-1.5 text-emerald-400">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    Standard Predictor
                                </div>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Balance:</span>
                                <span className="text-2xl font-black text-text tabular-nums">{formatPred(profile.balance)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section - Simplified Container */}
                    <div className="lg:w-[450px] card-modern p-6 bg-surface/50">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Portfolio Value</div>
                        <PortfolioChart />
                    </div>
                </div>

                {/* ─── Performance Stats ─────────────────────── */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <LayoutGrid className="w-4 h-4 text-primary" />
                        <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest">Market Performance</h2>
                    </div>
                    <ProfileStats stats={profile.stats} />
                </div>

                {/* ─── Holdings & Activity ────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Active Positions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <Wallet className="w-4 h-4 text-emerald-400" />
                            <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest">Active Positions</h2>
                        </div>
                        <HoldingsList userId={userId} />
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <History className="w-4 h-4 text-primary" />
                            <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest">Recent Activity</h2>
                        </div>
                        <TradeHistory userId={userId} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
