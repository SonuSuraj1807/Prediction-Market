'use client';

import React, { useState } from 'react';
import { Sun, Moon, Palette, Check } from 'lucide-react';
import { useTheme } from '../theme-provider';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'light' as const, name: 'Light', icon: Sun, color: 'text-amber-500' },
        { id: 'medium' as const, name: 'Medium Dark', icon: Palette, color: 'text-slate-400' },
        { id: 'dark' as const, name: 'Deep Dark', icon: Moon, color: 'text-indigo-400' },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl bg-surface-raised border border-border hover:border-primary/50 transition-all flex items-center justify-center group"
                aria-label="Toggle Theme"
            >
                {theme === 'light' && <Sun size={18} className="text-amber-500 group-hover:rotate-45 transition-transform" />}
                {theme === 'medium' && <Palette size={18} className="text-slate-400 group-hover:scale-110 transition-transform" />}
                {theme === 'dark' && <Moon size={18} className="text-indigo-400 group-hover:-rotate-12 transition-transform" />}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-2xl shadow-2xl p-2 z-50 animate-fade-in divide-y divide-border/50">
                        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-text-muted">
                            Choose Theme
                        </div>
                        <div className="py-1">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTheme(t.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${theme === t.id
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-text hover:bg-surface-raised'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <t.icon size={16} className={t.color} />
                                        <span className="text-xs font-bold">{t.name}</span>
                                    </div>
                                    {theme === t.id && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
