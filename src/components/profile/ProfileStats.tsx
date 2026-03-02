'use client';

import React from 'react';
import { formatPred, formatPercent } from '@/lib/utils';
import { TrendingUp, BarChart3, Target, Zap } from 'lucide-react';

interface ProfileStatsProps {
    stats: {
        tradesCount: number;
        winRate: number;
        totalProfit: number;
        accuracy: number;
    };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
    const displayStats = [
        {
            label: 'Accuracy',
            value: formatPercent(stats.accuracy),
            icon: Target,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
        },
        {
            label: 'Total Trades',
            value: stats.tradesCount.toString(),
            icon: BarChart3,
            color: 'text-primary',
            bg: 'bg-primary/10',
        },
        {
            label: 'Win Rate',
            value: formatPercent(stats.winRate),
            icon: Zap,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10',
        },
        {
            label: 'Net Profit',
            value: formatPred(stats.totalProfit),
            icon: TrendingUp,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayStats.map((stat) => (
                <div key={stat.label} className="card-modern p-5 flex flex-col gap-4 bg-surface/50">
                    <div className={`p-1.5 w-fit rounded-lg ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none mb-1.5">{stat.label}</div>
                        <div className="text-xl font-bold text-text tabular-nums">{stat.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
