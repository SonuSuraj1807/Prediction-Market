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
            className="p-6 bg-surface-raised border border-border rounded-[2rem] hover:border-primary/30 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
            <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${position.side === 'YES' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                        {position.side}
                    </span>
                    <h3 className="text-text font-bold group-hover:text-primary transition-colors line-clamp-1">
                        {position.markets.title}
                    </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-muted">
                    <div>{position.shares} Shares</div>
                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                    <div>Avg {position.avg_price}¢</div>
                </div>
            </div>

            <div className="flex items-center gap-8 sm:text-right border-t sm:border-t-0 border-border pt-6 sm:pt-0">
                <div>
                    <div className="text-xl font-black text-text">
                        {formatPred(currentValue)}
                    </div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                        Market Value
                    </div>
                </div>

                <div className="min-w-[80px]">
                    <div className={`flex items-center sm:justify-end gap-1 text-lg font-black ${isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isProfit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {Math.abs(profitPercent).toFixed(1)}%
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${isProfit ? 'text-emerald-500/50' : 'text-rose-500/50'}`}>
                        {isProfit ? '+' : ''}{formatPred(profit)}
                    </div>
                </div>
            </div>
        </Link>
    );
}
