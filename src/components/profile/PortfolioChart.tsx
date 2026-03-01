'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@/components/theme-provider';

const mockData = [
    { name: 'Mon', value: 1000 },
    { name: 'Tue', value: 1200 },
    { name: 'Wed', value: 1100 },
    { name: 'Thu', value: 1450 },
    { name: 'Fri', value: 1800 },
    { name: 'Sat', value: 2100 },
    { name: 'Sun', value: 2450 },
];

export function PortfolioChart() {
    const { theme } = useTheme();

    // Chart colors based on theme
    const chartColor = theme === 'light' ? '#4f46e5' : '#818cf8';
    const gridColor = theme === 'light' ? '#e5e7eb' : '#1f2937';
    const tickColor = theme === 'light' ? '#6b7280' : '#4b5563';
    const tooltipBg = theme === 'light' ? '#ffffff' : '#111827';
    const tooltipBorder = theme === 'light' ? '#e5e7eb' : '#374151';

    return (
        <div className="w-full h-[300px] bg-surface-raised border border-border/50 rounded-[3rem] p-8 overflow-hidden transition-colors">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-text font-black uppercase tracking-tighter text-lg">Portfolio Value</h3>
                    <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Last 7 Days (PRED)</p>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <span className="text-emerald-500 font-black text-sm">↑ 145%</span>
                </div>
            </div>

            <div className="w-full h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: tickColor, fontSize: 10, fontWeight: 'bold' }}
                            padding={{ left: 20, right: 20 }}
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: tooltipBg,
                                border: `1px solid ${tooltipBorder}`,
                                borderRadius: '1rem',
                                color: theme === 'light' ? '#000' : '#fff',
                                fontWeight: 'bold'
                            }}
                            itemStyle={{ color: chartColor }}
                            labelStyle={{ color: theme === 'light' ? '#6b7280' : '#9ca3af', marginBottom: '4px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor}
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
