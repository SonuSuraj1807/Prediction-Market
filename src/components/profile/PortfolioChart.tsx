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
    return (
        <div className="w-full h-[300px] bg-gray-900/30 border border-gray-800/50 rounded-[3rem] p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-white font-black uppercase tracking-tighter text-lg">Portfolio Value</h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Last 7 Days (PRED)</p>
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
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 'bold' }}
                            padding={{ left: 20, right: 20 }}
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#111827',
                                border: '1px solid #374151',
                                borderRadius: '1rem',
                                color: '#fff',
                                fontWeight: 'bold'
                            }}
                            itemStyle={{ color: '#818cf8' }}
                            labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#6366f1"
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
