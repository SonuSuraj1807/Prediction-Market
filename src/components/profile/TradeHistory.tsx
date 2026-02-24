'use client';

import React from 'react';
import { trpc } from '@/utils/trpc';
import { formatPred } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface TradeHistoryProps {
    userId: string;
}

export function TradeHistory({ }: TradeHistoryProps) {
    // We need a query for this. Reusing getPositions or adding a dedicated one.
    // getPositions already exists in tradeRouter. Let's use it for now as it shows active/history positions.
    const { data: positions, isLoading } = trpc.trade.getPositions.useQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    if (!positions || positions.length === 0) {
        return (
            <div className="p-12 text-center bg-gray-900/40 border border-gray-800 rounded-3xl">
                <p className="text-gray-500 font-medium italic">No active positions yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest px-2">Active Positions</h3>
            <div className="grid grid-cols-1 gap-3">
                {positions.map((pos) => (
                    <div key={pos.id} className="p-5 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-between hover:border-gray-700 transition-all group">
                        <div className="space-y-1">
                            <div className="text-white font-bold group-hover:text-indigo-400 transition-colors">
                                {pos.markets.title}
                            </div>
                            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-tighter">
                                <span className={pos.side === 'YES' ? 'text-emerald-500' : 'text-rose-500'}>
                                    {pos.side} • {pos.shares} Shares
                                </span>
                                <span className="text-gray-600">|</span>
                                <span className="text-gray-400">Locked: {formatPred(pos.avg_price * pos.shares / 100)}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-black text-white">
                                {pos.markets.yes_price}%
                            </div>
                            <div className="text-[10px] font-bold text-gray-500 uppercase">Current Price</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
