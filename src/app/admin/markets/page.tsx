'use client';

import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { CreateMarketForm } from '@/components/admin/CreateMarketForm';
import { Button } from '@/components/ui/Button';
import { formatDate, formatPercent } from '@/lib/utils';
import { Plus, X, CheckCircle2 } from 'lucide-react';

export default function AdminMarketsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const utils = trpc.useUtils();

    const marketsQuery = trpc.admin.getAllMarkets.useQuery();
    const resolveMarket = trpc.admin.resolveMarket.useMutation({
        onSuccess: () => {
            utils.admin.getAllMarkets.invalidate();
        },
    });

    const handleResolve = (marketId: string, resolution: 'YES' | 'NO' | 'CANCELLED') => {
        if (confirm(`Are you sure you want to resolve this market as ${resolution}?`)) {
            resolveMarket.mutate({ marketId, resolution });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-text">Market Management</h2>
                    <p className="text-text-muted">Create, monitor, and resolve prediction markets.</p>
                </div>
                <Button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="flex items-center gap-2"
                >
                    {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {isFormOpen ? 'Close Form' : 'Create New Market'}
                </Button>
            </div>

            {isFormOpen && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    <CreateMarketForm onSuccess={() => {
                        setIsFormOpen(false);
                        utils.admin.getAllMarkets.invalidate();
                    }} />
                </div>
            )}

            <div className="bg-surface rounded-xl border border-border overflow-hidden transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-surface-raised border-b border-border">
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Market Details</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Pool / Price</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Resolves At</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-muted text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {marketsQuery.isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-text-muted">Loading markets...</td>
                                </tr>
                            ) : marketsQuery.data?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-text-muted">No markets found. Create one to get started.</td>
                                </tr>
                            ) : (
                                marketsQuery.data?.map((market) => (
                                    <tr key={market.id} className="hover:bg-primary/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-text">{market.title}</div>
                                            <div className="text-xs text-text-muted mt-1 flex gap-2">
                                                <span className="bg-surface-raised px-1.5 py-0.5 rounded uppercase border border-border">{market.category}</span>
                                                <span className="bg-surface-raised px-1.5 py-0.5 rounded uppercase border border-border">{market.region}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <span className="text-primary-light">Y: {market.yes_pool}</span> /
                                                <span className="text-purple-400"> N: {market.no_pool}</span>
                                            </div>
                                            <div className="text-xs font-bold text-text-muted mt-1">
                                                Price: {formatPercent(market.yes_price)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-muted">
                                            {formatDate(market.resolves_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${market.status === 'open' ? 'bg-green-500/10 text-green-500' :
                                                market.status === 'closed' ? 'bg-yellow-500/10 text-yellow-500' :
                                                    'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                {market.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {market.status === 'open' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleResolve(market.id, 'YES')}
                                                        className="p-2 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors"
                                                        title="Resolve YES"
                                                    >
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleResolve(market.id, 'NO')}
                                                        className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                                                        title="Resolve NO"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                            {market.status === 'resolved' && (
                                                <div className="text-xs text-text-muted italic">
                                                    Resolved as {market.resolution}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
