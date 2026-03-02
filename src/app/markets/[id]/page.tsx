'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { trpc } from '@/utils/trpc';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TradeSidebar } from '@/components/market/TradeSidebar';
import { PriceChart } from '@/components/market/PriceChart';
import { Loader2, TrendingUp, Info, Activity, MessageSquare, ChevronLeft } from 'lucide-react';
import { formatPercent, formatPred, CATEGORY_DISPLAY } from '@/lib/utils';
import Link from 'next/link';

export default function MarketDetailPage() {
    const { id } = useParams() as { id: string };

    const { data: market, isLoading, isError } = trpc.market.getById.useQuery({ id });

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-surface">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-text-muted font-medium">Loading market details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (isError || !market) {
        return (
            <div className="min-h-screen flex flex-col bg-surface">
                <Navbar />
                <div className="flex-1 container-polymarket py-20 text-center space-y-6">
                    <div className="text-6xl text-text-muted/20">😕</div>
                    <h1 className="text-2xl font-bold text-text">Market Not Found</h1>
                    <p className="text-text-muted">The market you are looking for does not exist or has been removed.</p>
                    <Link href="/markets" className="inline-flex items-center text-primary font-bold hover:underline">
                        <ChevronLeft className="w-5 h-5" />
                        Back to all markets
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const categoryInfo = CATEGORY_DISPLAY[market.category] || { label: market.category, emoji: '📦' };

    return (
        <div className="min-h-screen flex flex-col bg-surface">
            <Navbar />

            <main className="flex-1 container-polymarket py-8 space-y-8">
                {/* Breadcrumbs & Navigation */}
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    <Link href="/markets" className="hover:text-text transition-colors">Markets</Link>
                    <span>/</span>
                    <Link href={`/markets?category=${market.category}`} className="hover:text-text transition-colors">
                        {categoryInfo.label}
                    </Link>
                    <span>/</span>
                    <span className="text-text truncate">{market.title}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Market Info & Activity */}
                    <div className="flex-1 space-y-8 max-w-4xl">
                        {/* Hero Section */}
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="px-2 py-0.5 rounded bg-surface-raised border border-border text-[10px] font-bold uppercase tracking-wider text-primary">
                                            {categoryInfo.emoji} {categoryInfo.label}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-text-muted font-bold uppercase">
                                            <TrendingUp className="w-3 h-3" />
                                            {formatPred(market.total_volume)} Volume
                                        </div>
                                    </div>
                                    <h1 className="text-3xl font-bold text-text leading-tight tracking-tight">
                                        {market.title}
                                    </h1>
                                </div>
                                <div className="shrink-0 flex items-center gap-2">
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Chance</div>
                                        <div className="text-4xl font-extrabold text-text tracking-tighter">
                                            {formatPercent(market.yes_price)}
                                        </div>
                                    </div>
                                    <div className={`text-xs font-bold px-2 py-1 rounded ${market.yes_price > 50 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                        {market.yes_price > 50 ? '▲' : '▼'} High
                                    </div>
                                </div>
                            </div>

                            {/* Live Price Chart */}
                            <PriceChart marketId={market.id} currentYesPrice={market.yes_price} />
                        </div>

                        {/* Tabs / Content Sections */}
                        <div className="space-y-6">
                            <div className="flex border-b border-border gap-6">
                                <button className="pb-3 text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary">About</button>
                                <button className="pb-3 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text transition-colors">Comments</button>
                                <button className="pb-3 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text transition-colors font-mono">Order Book</button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <Info className="w-4 h-4" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">How it works</h3>
                                </div>
                                <div className="text-sm text-text-muted leading-relaxed space-y-4">
                                    <p>{market.description || 'This market predicts the outcome of the event. If the event happens as described, those holding YES shares will be winners. If not, NO shares will be winners.'}</p>
                                    <p>The price reflects the current probability as determined by the collective intelligence of all traders. Every trade helps refine the prediction.</p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-border flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> {market.trader_count} Traders</span>
                                    <span className="flex items-center gap-1 font-mono hover:text-primary cursor-help underline decoration-dotted underline-offset-2">Contract Details</span>
                                </div>
                                <div className="shrink-0 flex items-center gap-2">
                                    Share this Market <MessageSquare className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Trade Sidebar */}
                    <div className="w-full lg:w-80 shrink-0">
                        <TradeSidebar market={market} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
