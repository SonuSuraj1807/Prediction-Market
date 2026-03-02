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

            <main className="flex-1 container-polymarket py-8 space-y-8">
                {/* Minimal Header */}
                <div className="flex items-end justify-between border-b border-border pb-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-text tracking-tight flex items-center gap-2">
                            Explore Markets
                        </h1>
                        <p className="text-sm text-text-muted font-medium">
                            Discover and trade on real-world events using PRED.
                        </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-text-muted bg-surface-raised px-2 py-1 rounded border border-border">
                        <TrendingUp className="w-3 h-3 text-rose-500" />
                        Live Predictions
                    </div>
                </div>

                {/* Grid vs sidebar */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <FilterBar filters={filters} setFilters={setFilters} />

                    {/* Market List */}
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-bold uppercase tracking-tighter text-text-muted flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                Trending Predictions
                            </h2>
                            <div className="text-[10px] text-text-muted font-mono">
                                {filters.search ? `Results for "${filters.search}"` : 'Showing all'}
                            </div>
                        </div>
                        <MarketGrid filters={filters} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
