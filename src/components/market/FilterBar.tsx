'use client';

import React from 'react';
import { CATEGORIES, REGIONS } from '@/lib/constants';
import { CATEGORY_DISPLAY, REGION_DISPLAY } from '@/lib/utils';
import { Search, Globe } from 'lucide-react';

import { Category, Region } from '@/lib/constants';

interface FilterBarProps {
    filters: {
        category?: Category;
        region?: Region;
        search?: string;
        status?: 'open' | 'closed' | 'resolved';
    };
    setFilters: (filters: { category?: Category; region?: Region; search?: string; status?: 'open' | 'closed' | 'resolved' }) => void;
}

export function FilterBar({ filters, setFilters }: FilterBarProps) {
    return (
        <aside className="w-full lg:w-64 shrink-0 space-y-8">
            {/* Search Section */}
            <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Search</h4>
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Keywords..."
                        className="w-full input-modern pl-10 h-10 text-sm"
                        value={filters.search || ''}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                </div>
            </div>

            {/* Categories Section */}
            <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Topic</h4>
                <div className="space-y-1">
                    <button
                        onClick={() => {
                            const newFilters = { ...filters };
                            delete newFilters.category;
                            setFilters(newFilters);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${!filters.category
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-text-muted hover:text-text hover:bg-surface-raised'
                            }`}
                    >
                        All Topics
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilters({ ...filters, category: cat })}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filters.category === cat
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'text-text-muted hover:text-text hover:bg-surface-raised'
                                }`}
                        >
                            <span>{CATEGORY_DISPLAY[cat]?.emoji}</span>
                            <span className="flex-1">{CATEGORY_DISPLAY[cat]?.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Region Section */}
            <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Region</h4>
                <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <select
                        className="w-full input-modern pl-9 h-10 text-sm appearance-none cursor-pointer pr-8"
                        value={filters.region || ''}
                        onChange={(e) => setFilters({ ...filters, region: (e.target.value as Region) || undefined })}
                    >
                        <option value="">Global</option>
                        {REGIONS.map((reg) => (
                            <option key={reg} value={reg}>
                                {REGION_DISPLAY[reg]?.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Status Section */}
            <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Status</h4>
                <div className="grid grid-cols-1 gap-1">
                    {(['open', 'closed', 'resolved'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilters({ ...filters, status })}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filters.status === status
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'text-text-muted hover:text-text hover:bg-surface-raised'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
