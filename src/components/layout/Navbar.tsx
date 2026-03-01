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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <TrendingUp className="w-7 h-7 text-primary" />
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            {APP_NAME}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/markets" className="text-sm text-text-muted hover:text-text transition-colors">
                            Markets
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link href="/portfolio" className="text-sm text-text-muted hover:text-text transition-colors">
                                    Portfolio
                                </Link>
                                <Link href="/leaderboard" className="text-sm text-text-muted hover:text-text transition-colors">
                                    Leaderboard
                                </Link>
                                {isAdmin && (
                                    <Link href="/admin/markets" className="text-sm text-amber-500 hover:text-amber-600 transition-colors">
                                        Admin
                                    </Link>
                                )}
                            </>
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        {isAuthenticated && user ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-raised rounded-full border border-border">
                                    <span className="text-sm font-mono text-emerald-400">{formatPred(user.balance)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/profile/${user.id}`}
                                        className="flex items-center gap-2 text-sm text-text-muted hover:text-text"
                                    >
                                        <User className="w-4 h-4" />
                                        {user.display_name}
                                    </Link>
                                    <button onClick={signOut} className="p-2 text-text-muted hover:text-text rounded-lg hover:bg-surface-raised">
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl text-sm font-medium hover:from-primary-dark hover:to-purple-500 transition-all shadow-lg shadow-primary/20"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-text-muted hover:text-text"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 space-y-2 animate-fade-in">
                        <Link href="/markets" className="block px-3 py-2 text-text-muted hover:text-text rounded-lg hover:bg-surface-raised" onClick={() => setMobileMenuOpen(false)}>
                            Markets
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link href="/portfolio" className="block px-3 py-2 text-text-muted hover:text-text rounded-lg hover:bg-surface-raised" onClick={() => setMobileMenuOpen(false)}>
                                    Portfolio
                                </Link>
                                <Link href="/leaderboard" className="block px-3 py-2 text-text-muted hover:text-text rounded-lg hover:bg-surface-raised" onClick={() => setMobileMenuOpen(false)}>
                                    Leaderboard
                                </Link>
                            </>
                        )}
                        {!isAuthenticated && (
                            <Link href="/login" className="block px-3 py-2 text-primary" onClick={() => setMobileMenuOpen(false)}>
                                Sign In
                            </Link>
                        )}
                        {isAuthenticated && user && (
                            <div className="px-3 py-2 text-sm text-emerald-400 font-mono">
                                Balance: {formatPred(user.balance)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
