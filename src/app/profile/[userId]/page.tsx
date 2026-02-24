'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { trpc } from '@/utils/trpc';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { TradeHistory } from '@/components/profile/TradeHistory';
import { Loader2, Calendar, ShieldCheck } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
    const params = useParams();
    const userId = params.userId as string;

    const { data: profile, isLoading, error } = trpc.user.getProfile.useQuery({ userId });

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-950">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-950">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <div className="text-4xl">👤🚫</div>
                    <h2 className="text-2xl font-bold text-white">Profile Not Found</h2>
                    <p className="text-gray-500">The user you are looking for does not exist or has been removed.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-950">
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-900/30 p-8 rounded-[3rem] border border-gray-800/50">
                    <div className="w-32 h-32 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-4xl text-white font-black shadow-2xl shadow-indigo-600/30 overflow-hidden border-4 border-gray-800">
                        {profile.avatar_url ? (
                            <img src={profile.avatar_url} alt={profile.display_name} className="w-full h-full object-cover" />
                        ) : (
                            profile.display_name.slice(0, 1).toUpperCase()
                        )}
                    </div>

                    <div className="text-center md:text-left space-y-3">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                                {profile.display_name}
                            </h1>
                            {profile.role === 'admin' && (
                                <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-500 uppercase tracking-widest">
                                    Staff
                                </div>
                            )}
                            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                Verified Predictor
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500 font-bold uppercase tracking-tight">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Joined {formatDate(profile.created_at)}
                            </div>
                            <div className="flex items-center gap-2 text-emerald-500">
                                <ShieldCheck className="w-4 h-4" />
                                KYC Level 1
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white px-2">Market Performance</h2>
                    <ProfileStats stats={profile.stats} />
                </div>

                {/* Activity Feed / Positions */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white px-2">Recent Activity</h2>
                    <TradeHistory userId={userId} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
