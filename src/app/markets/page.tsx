'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FilterBar } from '@/components/market/FilterBar';
import { MarketGrid } from '@/components/market/MarketGrid';
import { TrendingUp, Sparkles } from 'lucide-react';

import { Category, Region } from '@/lib/constants';

export default function MarketsPage() {
    const [filters, setFilters] = useState<{
        category?: Category;
        region?: Region;
        search?: string;
        status?: 'open' | 'closed' | 'resolved';
    }>({
        status: 'open',
    });

    return (
        <div className="min-h-screen flex flex-col bg-gray-950">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
                {/* Page Header */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-bold text-indigo-400 uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" />
                        Active Markets
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        Predict the <span className="text-gray-500 italic">Unpredictable</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        Join the collective intelligence. Research, trade, and win PRED coins by forecasting real-world outcomes across sports, tech, and global events.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <FilterBar filters={filters} setFilters={setFilters} />

                {/* Market Grid */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-tighter">
                        <TrendingUp className="w-4 h-4" />
                        Trending Markets
                    </div>
                    <MarketGrid filters={filters} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
