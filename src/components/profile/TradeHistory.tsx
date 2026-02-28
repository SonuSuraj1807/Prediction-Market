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
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    if (!activity || activity.length === 0) {
        return (
            <div className="p-12 text-center bg-gray-900/40 border border-gray-800 rounded-3xl">
                <p className="text-gray-500 font-medium italic">No recent activity.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-950">
            <table className="w-full text-left">
                <thead className="bg-gray-900/50 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-gray-800">
                    <tr>
                        <th className="px-6 py-4">Event</th>
                        <th className="px-6 py-4">Action</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4 text-right">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                    {activity.map((trade) => (
                        <tr key={trade.id} className="hover:bg-gray-900/30 transition-colors group">
                            <td className="px-6 py-4">
                                <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
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
                                <span className="text-sm font-bold text-gray-300">{trade.price}¢</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-black text-white">{formatPred(trade.cost)}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-xs font-bold text-gray-500 uppercase">{formatDate(trade.created_at)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
