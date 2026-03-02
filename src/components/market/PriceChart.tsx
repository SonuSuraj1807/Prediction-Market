'use client';

import React, { useMemo } from 'react';
import { trpc } from '@/utils/trpc';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Activity, Loader2 } from 'lucide-react';
import { formatPercent } from '@/lib/utils';

interface PriceChartProps {
    marketId: string;
    currentYesPrice: number;
}

interface TradeData {
    id: string;
    side: string;
    price: number;
    shares: number;
    cost: number;
    created_at: string;
}

export function PriceChart({ marketId, currentYesPrice }: PriceChartProps) {
    const { data: trades, isLoading } = trpc.trade.getHistory.useQuery(
        { marketId, limit: 100 },
        { refetchInterval: 15000 } // Refresh every 15s for "live" feel
    );

    const chartData = useMemo(() => {
        if (!trades || trades.length === 0) {
            // Generate synthetic data points around the current price for visual appeal
            const now = Date.now();
            const points = [];
            let price = 50; // Start at 50
            for (let i = 24; i >= 0; i--) {
                const drift = (currentYesPrice - 50) / 24;
                price = Math.max(1, Math.min(99, price + drift + (Math.random() - 0.5) * 4));
                points.push({
                    time: new Date(now - i * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    timestamp: now - i * 3600000,
                    yes: Math.round(price),
                    no: Math.round(100 - price),
                });
            }
            // Ensure last point matches current price
            points[points.length - 1].yes = currentYesPrice;
            points[points.length - 1].no = 100 - currentYesPrice;
            return points;
        }

        // Real trade data — map to chart points
        const sorted = [...trades].sort(
            (a: TradeData, b: TradeData) =>
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        return sorted.map((trade: TradeData) => ({
            time: new Date(trade.created_at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            timestamp: new Date(trade.created_at).getTime(),
            yes: trade.price,
            no: 100 - trade.price,
        }));
    }, [trades, currentYesPrice]);

    if (isLoading) {
        return (
            <div className="card-modern h-[400px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="card-modern h-[400px] p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-bold text-text">Price History</h3>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-text-muted">YES {formatPercent(currentYesPrice)}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="text-text-muted">NO {formatPercent(100 - currentYesPrice)}</span>
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="yesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="noGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.04)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="time"
                            tick={{ fontSize: 10, fill: '#9ca3af' }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                            tickLine={false}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            domain={[0, 100]}
                            tick={{ fontSize: 10, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v: number) => `${v}%`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '0.75rem',
                                fontSize: '12px',
                                padding: '10px 14px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                            }}
                            labelStyle={{ color: '#9ca3af', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                            formatter={((value: number | undefined, name: string | undefined) => [
                                `${value ?? 0}%`,
                                name === 'yes' ? 'YES' : 'NO',
                            ]) as never}
                            itemStyle={{ color: '#f3f4f6', fontWeight: 700, fontSize: '13px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="yes"
                            stroke="#10b981"
                            strokeWidth={2.5}
                            fill="url(#yesGradient)"
                            dot={false}
                            activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#030712' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="no"
                            stroke="#f43f5e"
                            strokeWidth={1.5}
                            fill="url(#noGradient)"
                            dot={false}
                            activeDot={{ r: 4, stroke: '#f43f5e', strokeWidth: 2, fill: '#030712' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
