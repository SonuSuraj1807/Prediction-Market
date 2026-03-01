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
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-text-muted group-focus-within:text-primary transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search markets (e.g. World Cup, Elections, Fed Rate...)"
                    className="block w-full pl-11 pr-4 py-4 bg-surface border border-border rounded-2xl text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-inner"
                    value={filters.search || ''}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                {/* Category Filters */}
                <div className="flex-1 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-2 min-w-max">
                        <button
                            onClick={() => {
                                const newFilters = { ...filters };
                                delete newFilters.category;
                                setFilters(newFilters);
                            }}
                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${!filters.category
                                ? 'bg-primary border-primary-light text-white shadow-lg shadow-primary/20'
                                : 'bg-surface-raised border-border text-text-muted hover:border-primary/50 hover:text-text'
                                }`}
                        >
                            All Topics
                        </button>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilters({ ...filters, category: cat })}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 ${filters.category === cat
                                    ? 'bg-primary border-primary-light text-white shadow-lg shadow-primary/20'
                                    : 'bg-surface-raised border-border text-text-muted hover:border-primary/50 hover:text-text'
                                    }`}
                            >
                                <span>{CATEGORY_DISPLAY[cat]?.emoji}</span>
                                <span>{CATEGORY_DISPLAY[cat]?.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Region Filter */}
                <div className="relative min-w-[180px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 text-text-muted" />
                    </div>
                    <select
                        className="block w-full pl-10 pr-4 py-2 bg-surface-raised border border-border rounded-xl text-sm font-bold text-text focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                        value={filters.region || ''}
                        onChange={(e) => setFilters({ ...filters, region: (e.target.value as Region) || undefined })}
                    >
                        <option value="">Global (All Regions)</option>
                        {REGIONS.map((reg) => (
                            <option key={reg} value={reg}>
                                {REGION_DISPLAY[reg]?.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
