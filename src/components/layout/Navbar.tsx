'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { APP_NAME } from '@/lib/constants';
import { formatPred } from '@/lib/utils';
import { TrendingUp, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
    const { user, isAuthenticated, isAdmin, signOut } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-border bg-surface/80 backdrop-blur-xl">
            <div className="container-polymarket">
                {/* Top Row: Logo, Search, Auth */}
                <div className="flex items-center justify-between h-14 gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <TrendingUp className="w-6 h-6 text-primary" />
                        <span className="text-lg font-bold tracking-tight text-text hidden sm:block">
                            {APP_NAME}
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder={`Search ${APP_NAME} markets...`}
                            className="w-full input-modern pl-10 h-9 text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-muted/40 text-[10px] font-mono">
                            /
                        </div>
                    </div>

                    {/* Right Side: Auth & Profile */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>

                        {isAuthenticated && user ? (
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-surface-raised border border-border rounded-lg">
                                    <span className="text-xs font-bold text-emerald-400">{formatPred(user.balance)}</span>
                                </div>
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="flex items-center gap-2 h-9 px-3 rounded-lg hover:bg-surface-raised transition-colors border border-transparent hover:border-border"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                        <User className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium hidden lg:block">{user.display_name}</span>
                                </Link>
                                <button onClick={signOut} className="p-2 text-text-muted hover:text-text rounded-lg hover:bg-surface-raised">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-5 py-1.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-all"
                            >
                                Sign In
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-text-muted hover:text-text"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Categories - Desktop Only */}
                <div className="hidden md:flex items-center gap-2 h-10 border-t border-border/50">
                    <Link href="/markets?category=trending" className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted hover:text-text transition-colors">
                        <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
                        Trending
                    </Link>
                    <div className="h-4 w-[1px] bg-border mx-1" />
                    {['Politics', 'Sports', 'Crypto', 'Finance', 'Geopolitics', 'Tech', 'Entertainment'].map((cat) => (
                        <Link
                            key={cat}
                            href={`/markets?category=${cat.toLowerCase()}`}
                            className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted hover:text-text transition-colors"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu & Search */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 space-y-4 animate-fade-in px-2">
                        <div className="relative mt-2">
                            <input
                                type="text"
                                placeholder={`Search ${APP_NAME} markets...`}
                                className="w-full input-modern pl-10 h-10 text-sm"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Link href="/markets" className="flex items-center px-3 py-2 text-sm text-text-muted hover:text-text rounded-lg bg-surface-raised" onClick={() => setMobileMenuOpen(false)}>
                                All Markets
                            </Link>
                            {isAuthenticated && (
                                <>
                                    <Link href={user ? `/profile/${user.id}` : '/login'} className="flex items-center px-3 py-2 text-sm text-text-muted hover:text-text rounded-lg bg-surface-raised" onClick={() => setMobileMenuOpen(false)}>
                                        Portfolio
                                    </Link>
                                    <Link href="/leaderboard" className="flex items-center px-3 py-2 text-sm text-text-muted hover:text-text rounded-lg bg-surface-raised" onClick={() => setMobileMenuOpen(false)}>
                                        Leaderboard
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                            <ThemeToggle />
                            {!isAuthenticated && (
                                <Link href="/login" className="text-sm font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
