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
        <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            <table className="w-full text-left">
                <thead className="bg-surface-raised text-[10px] font-black uppercase tracking-widest text-text-muted border-b border-border">
                    <tr>
                        <th className="px-6 py-4">Event</th>
                        <th className="px-6 py-4">Action</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4 text-right">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                    {activity.map((trade: any) => (
                        <tr key={trade.id} className="hover:bg-surface-raised/50 transition-colors group">
                            <td className="px-6 py-4">
                                <span className="text-sm font-bold text-text group-hover:text-primary transition-colors line-clamp-1">
                                    {trade.markets.title}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    {trade.action === 'buy' ? (
                                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                                    ) : (
                                        <ArrowDownRight className="w-3 h-3 text-rose-500" />
                                    )}
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${trade.action === 'buy' ? 'text-emerald-500' : 'text-rose-500'
                                        }`}>
                                        {trade.action} {trade.side}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-bold text-text-muted">{trade.price}¢</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-black text-text">{formatPred(trade.cost)}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-xs font-bold text-text-muted uppercase">{formatDate(trade.created_at)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
