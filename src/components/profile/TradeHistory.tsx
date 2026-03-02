'use client';

import React from 'react';
import { trpc } from '@/utils/trpc';
import { formatPred, formatDate } from '@/lib/utils';
import { Loader2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TradeHistoryProps {
    userId: string;
}

export function TradeHistory({ userId }: TradeHistoryProps) {
    const { data: activity, isLoading } = trpc.trade.getActivity.useQuery({ userId });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!activity || activity.length === 0) {
        return (
            <div className="p-12 text-center bg-surface-raised border border-border rounded-3xl">
                <p className="text-text-muted font-medium italic">No recent activity.</p>
            </div>
        );
    }

    return (
        <div className="card-modern overflow-hidden bg-surface/30">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-surface-raised/50 text-[9px] font-bold uppercase tracking-widest text-text-muted border-b border-border">
                        <tr>
                            <th className="px-5 py-3">Event</th>
                            <th className="px-5 py-3">Action</th>
                            <th className="px-5 py-3">Price</th>
                            <th className="px-5 py-3">Amount</th>
                            <th className="px-5 py-3 text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                        {activity.map((trade: any) => (
                            <tr key={trade.id} className="hover:bg-primary/5 transition-colors group">
                                <td className="px-5 py-3.5">
                                    <span className="text-[11px] font-bold text-text group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">
                                        {trade.markets.title}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-1.5">
                                        {trade.action === 'buy' ? (
                                            <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                                        ) : (
                                            <ArrowDownRight className="w-3 h-3 text-rose-500" />
                                        )}
                                        <span className={`text-[9px] font-bold uppercase tracking-widest ${trade.action === 'buy' ? 'text-emerald-500' : 'text-rose-500'
                                            }`}>
                                            {trade.action} {trade.side}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className="text-[11px] font-bold text-text-muted tabular-nums">{trade.price}¢</span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className="text-[11px] font-bold text-text tabular-nums">{formatPred(trade.cost)}</span>
                                </td>
                                <td className="px-5 py-3.5 text-right">
                                    <span className="text-[10px] font-bold text-text-muted uppercase tabular-nums">{formatDate(trade.created_at)}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
