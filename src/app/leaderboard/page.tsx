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

            <main className="flex-1 container-polymarket py-12 space-y-12">
                {/* Page Header */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-[10px] font-bold text-primary uppercase tracking-widest">
                        <Trophy className="w-3 h-3" />
                        Live Rankings
                    </div>
                    <h1 className="text-4xl font-extrabold text-text tracking-tight uppercase">
                        Global <span className="text-text-muted">Leaderboard</span>
                    </h1>
                    <p className="text-text-muted max-w-2xl text-sm font-medium leading-relaxed">
                        The top forecasters on {APP_NAME}. Rankings are calculated in real-time based on total PRED balance and historical accuracy.
                    </p>
                </div>

                {/* Stats Preview - Dense cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Cumulative Volume', value: '420.5k PRED', icon: TrendingUp, color: 'text-primary' },
                        { label: 'Total Predictions', value: '5,000+', icon: Sparkles, color: 'text-purple-400' },
                        { label: 'Top Accuracy', value: '88.4%', icon: Trophy, color: 'text-amber-500' },
                    ].map((stat) => (
                        <div key={stat.label} className="card-modern p-5 flex items-center gap-4 bg-surface/50">
                            <div className={`p-2 rounded-xl bg-surface-raised border border-border ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1.5">{stat.label}</div>
                                <div className="text-lg font-bold text-text tabular-nums">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Leaderboard Table */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                            Full Standings
                        </h2>
                        <span className="text-[10px] font-bold text-text-muted uppercase">Showing Top 50</span>
                    </div>
                    <Leaderboard />
                </div>

                {/* Call to Action - Subtle section */}
                <div className="card-modern p-10 bg-gradient-to-r from-primary/10 via-surface-raised to-transparent border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-text tracking-tight uppercase">Think you can do better?</h2>
                        <p className="text-sm text-text-muted font-medium max-w-sm">
                            Every accurate prediction moves you up the ranks. Start trading and prove your skills.
                        </p>
                    </div>
                    <Link
                        href="/markets"
                        className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
                    >
                        Start Predicting Now
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
