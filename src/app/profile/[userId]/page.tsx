'use client';

import React from 'react';
import { useParams } from 'next/navigation';
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

    const { data: profile, isLoading, error } = trpc.user.getProfile.useQuery({ userId });

    if (isLoading) {
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

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
                {/* ─── Profile Header ────────────────────────── */}
                <div className="flex flex-col lg:flex-row items-stretch gap-8">
                    {/* User Info Card */}
                    <div className="flex-1 flex flex-col md:flex-row items-center gap-8 bg-surface-raised p-10 rounded-[4rem] border border-border">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-5xl text-white font-black shadow-2xl shadow-primary/20 overflow-hidden border-4 border-border">
                            {profile.avatar_url ? (
                                <img src={profile.avatar_url} alt={profile.display_name} className="w-full h-full object-cover" />
                            ) : (
                                profile.display_name.slice(0, 1).toUpperCase()
                            )}
                        </div>

                        <div className="text-center md:text-left space-y-4">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <h1 className="text-4xl font-black text-text tracking-tighter uppercase leading-none">
                                    {profile.display_name}
                                </h1>
                                {profile.role === 'admin' && (
                                    <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest">
                                        Staff
                                    </div>
                                )}
                                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                                    Verified Predictor
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-text-muted font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-text-muted/60" />
                                    Joined {formatDate(profile.created_at)}
                                </div>
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <ShieldCheck className="w-4 h-4" />
                                    KYC Level 1
                                </div>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-2 text-2xl font-black text-text">
                                <Wallet className="w-6 h-6 text-primary" />
                                {formatPred(profile.balance)}
                                <span className="text-[10px] text-text-muted uppercase tracking-widest ml-1">Available Balance</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="lg:w-[400px]">
                        <PortfolioChart />
                    </div>
                </div>

                {/* ─── Performance Stats ─────────────────────── */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <LayoutGrid className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-black text-text uppercase tracking-tighter">Market Performance</h2>
                    </div>
                    <ProfileStats stats={profile.stats} />
                </div>

                {/* ─── Holdings & Activity ────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Active Positions */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-4">
                            <Wallet className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-black text-text uppercase tracking-tighter">Current Holdings</h2>
                        </div>
                        <HoldingsList userId={userId} />
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 px-4">
                            <History className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-black text-text uppercase tracking-tighter">Recent Activity</h2>
                        </div>
                        <TradeHistory userId={userId} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
