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
        <div className="min-h-screen flex flex-col bg-surface transition-colors">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
                {/* Page Header */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" />
                        Active Markets
                    </div>
                    <h1 className="text-4xl font-bold text-text tracking-tight">
                        Predict the <span className="text-text-muted italic">Unpredictable</span>
                    </h1>
                    <p className="text-text-muted max-w-2xl">
                        Join the collective intelligence. Research, trade, and win PRED coins by forecasting real-world outcomes across sports, tech, and global events.
                    </p>
                </div>

                {/* Filter & Search Bar */}
                <FilterBar filters={filters} setFilters={setFilters} />

                {/* Market Grid */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-text-muted font-bold text-xs uppercase tracking-tighter">
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
