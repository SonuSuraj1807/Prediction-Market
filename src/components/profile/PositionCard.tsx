'use client';

import React from 'react';
import { formatPred } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

interface PositionCardProps {
    position: {
        id: string;
        market_id: string;
        side: 'YES' | 'NO';
        shares: number;
        avg_price: number;
        markets: {
            title: string;
            yes_price: number;
            status: string;
        };
    };
}

export function PositionCard({ position }: PositionCardProps) {
    const currentPrice = position.side === 'YES' ? position.markets.yes_price : 100 - position.markets.yes_price;
    const totalCost = (position.avg_price * position.shares) / 100;
    const currentValue = (currentPrice * position.shares) / 100;
    const profit = currentValue - totalCost;
    const profitPercent = (profit / totalCost) * 100;
    const isProfit = profit >= 0;

    return (
        <Link
            href={`/markets/${position.market_id}`}
            className="card-modern p-4 hover:border-primary/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface/30"
        >
            <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase ${position.side === 'YES' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                        {position.side}
                    </span>
                    <h3 className="text-xs font-bold text-text group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">
                        {position.markets.title}
                    </h3>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    <span className="tabular-nums">{position.shares} Shares</span>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span>Avg {position.avg_price}¢</span>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 sm:text-right">
                <div className="space-y-0.5">
                    <div className="text-sm font-bold text-text tabular-nums">
                        {formatPred(currentValue)}
                    </div>
                    <div className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-none">
                        Value
                    </div>
                </div>

                <div className="min-w-[70px] space-y-0.5">
                    <div className={`flex items-center sm:justify-end gap-1 text-sm font-bold tabular-nums ${isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isProfit ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(profitPercent).toFixed(1)}%
                    </div>
                    <div className={`text-[9px] font-bold uppercase tracking-widest tabular-nums ${isProfit ? 'text-emerald-500/60' : 'text-rose-500/60'}`}>
                        {isProfit ? '+' : ''}{formatPred(profit)}
                    </div>
                </div>
            </div>
        </Link>
    );
}
