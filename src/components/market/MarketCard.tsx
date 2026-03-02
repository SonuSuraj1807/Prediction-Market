'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatPercent, formatPred, formatDate, CATEGORY_DISPLAY } from '@/lib/utils';
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
            <Link href={`/markets/${market.id}`} className="block">
                <Card className="card-modern group flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-surface-raised/50 transition-colors cursor-pointer">
                    {/* Left: Info & Title */}
                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                            <span className="px-1.5 py-0.5 rounded bg-surface border border-border">
                                {categoryInfo.emoji} {categoryInfo.label}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(market.resolves_at)}
                            </span>
                        </div>

                        <h3 className="text-base font-bold text-text line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {market.title}
                        </h3>

                        {/* Stats mini */}
                        <div className="flex items-center gap-4 text-[10px] text-text-muted font-bold">
                            <div className="flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>{formatPred(market.total_volume)} VOL.</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                <span>{market.trader_count} TRADERS</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions (YES/NO Buttons) */}
                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto" onClick={(e) => e.preventDefault()}>
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsTradeModalOpen(true); }}
                            className="flex-1 sm:w-24 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group/btn"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-emerald-400 group-hover/btn:scale-95 transition-transform">YES</span>
                                <span className="text-sm font-bold text-emerald-400">{formatPercent(market.yes_price)}</span>
                            </div>
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsTradeModalOpen(true); }}
                            className="flex-1 sm:w-24 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all group/btn"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-rose-400 group-hover/btn:scale-95 transition-transform">NO</span>
                                <span className="text-sm font-bold text-rose-400">{formatPercent(100 - market.yes_price)}</span>
                            </div>
                        </button>
                    </div>
                </Card>
            </Link>

            <TradeModal
                isOpen={isTradeModalOpen}
                onClose={() => setIsTradeModalOpen(false)}
                market={market}
            />
        </>
    );
}
