'use client';

import React from 'react';
import { trpc } from '@/utils/trpc';
import { MarketCard } from './MarketCard';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

import { Category, Region } from '@/lib/constants';

interface MarketGridProps {
    filters: {
        category?: Category;
        region?: Region;
        search?: string;
        status?: 'open' | 'closed' | 'resolved';
    };
}

export function MarketGrid({ filters }: MarketGridProps) {
    const [page, setPage] = React.useState(1);
    const limit = 12;

    const { data, isLoading, isError, error } = trpc.market.list.useQuery({
        ...filters,
        page,
        limit,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-text-muted font-medium">Fetching markets...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-8 text-center">
                <p className="text-rose-400 font-medium">Failed to load markets: {error.message}</p>
            </div>
        );
    }

    if (!data || data.markets.length === 0) {
        return (
            <div className="bg-surface-raised border border-border rounded-3xl p-16 text-center space-y-4">
                <div className="text-4xl">🔍</div>
                <h3 className="text-xl font-bold text-text">No markets found</h3>
                <p className="text-text-muted max-w-xs mx-auto">Try adjusting your filters or search terms to find what you&apos;re looking for.</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.markets.map((market) => (
                    <MarketCard key={market.id} market={market} />
                ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-8">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-2">
                        {[...Array(data.totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === i + 1
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-text-muted hover:text-text hover:bg-surface-raised'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                        disabled={page === data.totalPages}
                        className="flex items-center gap-2"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
