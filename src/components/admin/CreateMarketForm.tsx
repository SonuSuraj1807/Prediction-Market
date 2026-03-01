'use client';

import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { Category, Region, CATEGORIES, REGIONS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function CreateMarketForm({ onSuccess }: { onSuccess: () => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>(CATEGORIES[0]);
    const [region, setRegion] = useState<Region>(REGIONS[0]);
    const [resolvesAt, setResolvesAt] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    const createMarket = trpc.admin.createMarket.useMutation({
        onSuccess: () => {
            setTitle('');
            setDescription('');
            setResolvesAt('');
            onSuccess();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMarket.mutate({
            title,
            description,
            category,
            region,
            resolvesAt: new Date(resolvesAt).toISOString(),
            isFeatured,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-surface-raised p-6 rounded-xl border border-border transition-colors">
            <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Market Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary placeholder-text-muted/50"
                    required
                    placeholder="Will India win the 2026 World Cup?"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] placeholder-text-muted/50"
                    placeholder="Details about the resolution sourcer and criteria..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-muted mb-1">Region</label>
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value as Region)}
                        className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {REGIONS.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Resolves At</label>
                <input
                    type="datetime-local"
                    value={resolvesAt}
                    onChange={(e) => setResolvesAt(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-surface text-primary focus:ring-primary"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-text-muted">Featured Market</label>
            </div>

            <Button
                type="submit"
                className="w-full"
                isLoading={createMarket.status === 'pending'}
            >
                Create Market
            </Button>

            {createMarket.error && (
                <p className="text-red-500 text-sm mt-2">{createMarket.error.message}</p>
            )}
        </form>
    );
}
