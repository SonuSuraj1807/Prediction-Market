'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Leaderboard } from '@/components/leaderboard/Leaderboard';
import { Trophy, TrendingUp, Sparkles } from 'lucide-react';

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen flex flex-col bg-surface transition-colors">
            <Navbar />

            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
                {/* Page Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-bold text-yellow-500 uppercase tracking-widest">
                        <Trophy className="w-3 h-3" />
                        Global Rankings
                    </div>
                    <h1 className="text-5xl font-black text-text tracking-tighter">
                        THE <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">ELITE</span> LIST
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg">
                        Behold the top predictors on Eventix. Rankings are updated in real-time based on current PRED coin balances.
                    </p>
                </div>

                {/* Stats Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-surface-raised border border-border rounded-3xl space-y-2">
                        <div className="p-2 bg-primary/10 w-fit rounded-xl">
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-text">5,000+</div>
                        <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Predictions</div>
                    </div>
                    <div className="p-6 bg-surface-raised border border-border rounded-3xl space-y-2">
                        <div className="p-2 bg-purple-500/10 w-fit rounded-xl">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-2xl font-bold text-text">420.5k</div>
                        <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Volume Traded</div>
                    </div>
                    <div className="p-6 bg-surface-raised border border-border rounded-3xl space-y-2">
                        <div className="p-2 bg-yellow-500/10 w-fit rounded-xl">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="text-2xl font-bold text-text">12</div>
                        <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Grand Champions</div>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <Leaderboard />

                {/* Call to Action */}
                <div className="p-12 bg-primary rounded-[3rem] text-center space-y-6 relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white">Think you can do better?</h2>
                        <p className="text-white/80 max-w-md mx-auto mb-8">
                            Start trading now and climb the ranks. Every accurate prediction counts towards your global standing.
                        </p>
                        <button className="px-8 py-4 bg-white text-primary rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
                            Claim Your Spot
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
