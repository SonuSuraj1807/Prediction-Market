'use client';

import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/Button';
import { formatPercent, formatPred } from '@/lib/utils';
import { TrendingUp, AlertCircle, Wallet } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface TradeSidebarProps {
    market: {
        id: string;
        title: string;
        yes_price: number;
        yes_pool: number;
        no_pool: number;
        status: string;
    };
}

export function TradeSidebar({ market }: TradeSidebarProps) {
    const { user, isAuthenticated } = useAuth();
    const [side, setSide] = useState<'YES' | 'NO'>('YES');
    const [amount, setAmount] = useState<number>(10);
    const [isSuccess, setIsSuccess] = useState(false);

    // tRPC utils
    const utils = trpc.useUtils();
    const buyMutation = trpc.trade.buy.useMutation({
        onSuccess: () => {
            setIsSuccess(true);
            utils.trade.getPositions.invalidate();
            utils.market.getById.invalidate({ id: market.id });
            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        },
    });

    const { slippageEst, sharesEst } = React.useMemo(() => {
        if (!amount || amount <= 0) {
            return { slippageEst: 0, sharesEst: 0 };
        }

        const k = market.yes_pool * market.no_pool;
        let newYes: number, newNo: number, shares: number;

        if (side === 'YES') {
            newYes = market.yes_pool + amount;
            newNo = k / newYes;
            shares = market.no_pool - newNo;
        } else {
            newNo = market.no_pool + amount;
            newYes = k / newNo;
            shares = market.yes_pool - newYes;
        }

        const initialPrice = side === 'YES'
            ? market.yes_pool / market.no_pool
            : market.no_pool / market.yes_pool;

        const executionPrice = amount / shares;
        const slippage = Math.abs(executionPrice - initialPrice) / initialPrice;

        return {
            slippageEst: slippage,
            sharesEst: Math.floor(shares)
        };
    }, [amount, side, market]);

    const handleTrade = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) return;
        buyMutation.mutate({
            marketId: market.id,
            side,
            amount,
        });
    };

    if (market.status !== 'open') {
        return (
            <div className="card-modern p-6 bg-surface-raised/50 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-text-muted mx-auto" />
                <h3 className="text-sm font-bold text-text">Market Closed</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                    This market has concluded and is no longer accepting trades.
                </p>
            </div>
        );
    }

    return (
        <div className="card-modern overflow-hidden sticky top-24">
            {/* Header / Tabs */}
            <div className="flex border-b border-border">
                <button
                    onClick={() => setSide('YES')}
                    className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${side === 'YES'
                            ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                            : 'border-transparent text-text-muted hover:text-text'
                        }`}
                >
                    BUY YES
                </button>
                <button
                    onClick={() => setSide('NO')}
                    className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${side === 'NO'
                            ? 'border-rose-500 text-rose-400 bg-rose-500/5'
                            : 'border-transparent text-text-muted hover:text-text'
                        }`}
                >
                    BUY NO
                </button>
            </div>

            <div className="p-4 space-y-6">
                {/* Balance & Success info */}
                {isSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg animate-fade-in flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-medium text-emerald-400">Trade successful!</span>
                    </div>
                )}

                {!isAuthenticated && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-medium text-amber-500">Sign in to trade PRED.</span>
                    </div>
                )}

                {/* Amount Input */}
                <form onSubmit={handleTrade} className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">
                            <span>Amount</span>
                            {user && (
                                <span className="flex items-center gap-1">
                                    <Wallet className="w-3 h-3" />
                                    {formatPred(user.balance)}
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full input-modern pl-4 pr-16 h-12 text-lg font-bold"
                                min={1}
                                required
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-muted">
                                PRED
                            </div>
                        </div>
                    </div>

                    {/* Trade Presets */}
                    <div className="grid grid-cols-4 gap-1.5">
                        {[10, 50, 100, 500].map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => setAmount(val)}
                                className="py-1 px-2 rounded bg-surface border border-border text-[10px] font-bold text-text-muted hover:text-text hover:border-primary transition-colors"
                            >
                                +{val}
                            </button>
                        ))}
                    </div>

                    {/* Trade Detail Summary */}
                    <div className="bg-surface-raised/50 p-4 rounded-xl space-y-2 border border-border/50">
                        <div className="flex justify-between text-xs">
                            <span className="text-text-muted font-medium">Outcome Price</span>
                            <span className="text-text font-bold">
                                {side === 'YES' ? formatPercent(market.yes_price) : formatPercent(100 - market.yes_price)}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-text-muted font-medium">Estimated Shares</span>
                            <span className="text-text font-bold">{sharesEst}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-text-muted font-medium">Slippage</span>
                            <span className={`font-bold ${slippageEst > 0.15 ? 'text-rose-400' : 'text-primary'}`}>
                                {formatPercent(Math.round(slippageEst * 100))}
                            </span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className={`w-full h-12 text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${side === 'YES'
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                            }`}
                        disabled={!isAuthenticated || buyMutation.status === 'pending'}
                        isLoading={buyMutation.status === 'pending'}
                    >
                        Trade {side}
                    </Button>

                    {buyMutation.error && (
                        <p className="text-rose-500 text-center text-[11px] font-medium leading-relaxed">
                            {buyMutation.error.message}
                        </p>
                    )}
                </form>

                <p className="text-[10px] text-text-muted text-center px-4 leading-relaxed">
                    By trading, you agree to our Terms of Service. PRED is a virtual currency with no real-world value.
                </p>
            </div>
        </div>
    );
}
