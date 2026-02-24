'use client';

import React from 'react';
import { formatPred, formatPercent } from '@/lib/utils';
import { TrendingUp, BarChart3, Target, Zap } from 'lucide-react';

interface ProfileStatsProps {
    stats: {
        tradesCount: number;
        // For now these are mock/placeholders as requested in implementation plan
        winRate?: number;
        totalProfit?: number;
        accuracy?: number;
    };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
    const displayStats = [
        {
            label: 'Accuracy',
            value: formatPercent(stats.accuracy ?? 68),
            icon: Target,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
        },
        {
            label: 'Total Trades',
            value: stats.tradesCount.toString(),
            icon: BarChart3,
            color: 'text-indigo-400',
            bg: 'bg-indigo-500/10',
        },
        {
            label: 'Win Rate',
            value: formatPercent(stats.winRate ?? 54),
            icon: zapIcon, // Fix: local variable zapIcon or just Zap
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
        },
        {
            label: 'Net Profit',
            value: formatPred(stats.totalProfit ?? 1250),
            icon: TrendingUp,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayStats.map((stat) => (
                <div key={stat.label} className="p-6 bg-gray-900 border border-gray-800 rounded-3xl space-y-4">
                    <div className={`p-2 w-fit rounded-xl ${stat.bg}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-white">{stat.value}</div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-1">
                            {stat.label}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

const zapIcon = Zap; // Helper for mapping
