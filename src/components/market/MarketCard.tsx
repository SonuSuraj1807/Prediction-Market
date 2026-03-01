'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatPercent, formatPred, CATEGORY_DISPLAY } from '@/lib/utils';
import { TradeModal } from './trade-modal';
import { TrendingUp, Users, Clock } from 'lucide-react';

interface MarketCardProps {
    market: {
        id: string;
        title: string;
        description: string | null;
        category: string;
        region: string;
        yes_price: number;
        yes_pool: number;
        no_pool: number;
        total_volume: number;
        trader_count: number;
        resolves_at: string;
        status: string;
    };
}

export function MarketCard({ market }: MarketCardProps) {
    const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
    const categoryInfo = CATEGORY_DISPLAY[market.category] || { label: market.category, emoji: '📦' };

    return (
        <>
            <Card className="group hover:border-primary/50 transition-all duration-300 flex flex-col h-full overflow-hidden bg-surface/40 border-border">
                <div className="p-5 flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface border border-border text-[10px] font-bold uppercase tracking-wider text-text-muted">
                            <span>{categoryInfo.emoji}</span>
                            <span>{categoryInfo.label}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-text-muted font-medium">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(market.resolves_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-text line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {market.title}
                    </h3>

                    {/* Probability Visual */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-emerald-400">YES {formatPercent(market.yes_price)}</span>
                            <span className="text-rose-400">NO {formatPercent(100 - market.yes_price)}</span>
                        </div>
                        <div className="h-2 w-full bg-surface-higher rounded-full overflow-hidden flex">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                                style={{ width: `${market.yes_price}%` }}
                            />
                            <div
                                className="h-full bg-gradient-to-r from-rose-500 to-rose-600 transition-all duration-500"
                                style={{ width: `${100 - market.yes_price}%` }}
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="flex items-center gap-2 text-text-muted">
                            <TrendingUp className="w-4 h-4 text-primary/70" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold tracking-tighter">Volume</span>
                                <span className="text-xs text-text font-medium">{formatPred(market.total_volume)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-text-muted">
                            <Users className="w-4 h-4 text-secondary/70" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold tracking-tighter">Traders</span>
                                <span className="text-xs text-text font-medium">{market.trader_count}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Action */}
                <div className="px-5 pb-5 mt-auto">
                    <Button
                        className="w-full font-bold tracking-wide"
                        variant="secondary"
                        onClick={() => setIsTradeModalOpen(true)}
                        disabled={market.status !== 'open'}
                    >
                        {market.status === 'open' ? 'Trade Now' : 'Market Closed'}
                    </Button>
                </div>
            </Card>

            <TradeModal
                isOpen={isTradeModalOpen}
                onClose={() => setIsTradeModalOpen(false)}
                market={market}
            />
        </>
    );
}
