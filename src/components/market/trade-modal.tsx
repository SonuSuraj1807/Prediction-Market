'use client';

import React, { useState, useEffect } from 'react';
import { trpc } from '@/utils/trpc';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { formatPred, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface TradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    market: {
        id: string;
        title: string;
        yes_price: number;
        yes_pool: number;
        no_pool: number;
    };
}

export function TradeModal({ isOpen, onClose, market }: TradeModalProps) {
    const [side, setSide] = useState<'YES' | 'NO'>('YES');
    const [amount, setAmount] = useState<number>(10);
    const [slippageEst, setSlippageEst] = useState<number>(0);
    const [sharesEst, setSharesEst] = useState<number>(0);
    const [isSuccess, setIsSuccess] = useState(false);

    // tRPC utils
    const utils = trpc.useUtils();
    const buyMutation = trpc.trade.buy.useMutation({
        onSuccess: () => {
            setIsSuccess(true);
            utils.trade.getPositions.invalidate();
            utils.market.getById.invalidate({ id: market.id });
        },
    });

    // Simple local slippage estimation (matching server logic)
    useEffect(() => {
        if (!amount || amount <= 0) {
            setSlippageEst(0);
            setSharesEst(0);
            return;
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

        setSlippageEst(slippage);
        setSharesEst(Math.floor(shares));
    }, [amount, side, market]);

    const handleTrade = (e: React.FormEvent) => {
        e.preventDefault();
        buyMutation.mutate({
            marketId: market.id,
            side,
            amount,
        });
    };

    if (isSuccess) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} title="Trade Successful!">
                <div className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <p className="text-gray-300">
                        You successfully bought <span className="text-white font-bold">{sharesEst}</span> {side} shares.
                    </p>
                    <Button onClick={onClose} className="w-full">Done</Button>
                </div>
            </Modal>
        );
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Place Trade">
            <div className="p-6 space-y-6">
                <div>
                    <h3 className="text-white font-medium mb-1">{market.title}</h3>
                    <p className="text-sm text-gray-500">Current YES Price: {formatPercent(market.yes_price)}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-950 rounded-xl border border-gray-800">
                    <button
                        onClick={() => setSide('YES')}
                        className={`py-2 px-4 rounded-lg font-bold transition-all ${side === 'YES' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        YES
                    </button>
                    <button
                        onClick={() => setSide('NO')}
                        className={`py-2 px-4 rounded-lg font-bold transition-all ${side === 'NO' ? 'bg-rose-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        NO
                    </button>
                </div>

                <form onSubmit={handleTrade} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Trade Amount (PRED)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                min={1}
                                max={500}
                                required
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">PRED</span>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded-xl space-y-2 border border-gray-800/50">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Estimated Shares</span>
                            <span className="text-white font-medium">{sharesEst}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Price Impact / Slippage</span>
                            <span className={`font-medium ${slippageEst > 0.15 ? 'text-rose-400' : 'text-indigo-400'}`}>
                                {formatPercent(Math.round(slippageEst * 100))}
                            </span>
                        </div>
                    </div>

                    {slippageEst > 0.18 && (
                        <div className="flex gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <p>Warning: High slippage. You will get fewer shares due to low liquidity.</p>
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full py-4 text-lg"
                        variant={side === 'YES' ? 'yes' : 'no'}
                        isLoading={buyMutation.status === 'pending'}
                    >
                        Buy {side}
                    </Button>

                    {buyMutation.error && (
                        <p className="text-rose-500 text-center text-sm">{buyMutation.error.message}</p>
                    )}
                </form>
            </div>
        </Modal>
    );
}
