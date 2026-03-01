import { APP_NAME } from '@/lib/constants';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-border bg-surface transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-primary" />
                            <span className="text-lg font-bold text-text">{APP_NAME}</span>
                        </div>
                        <p className="text-sm text-text-muted">
                            Free-to-play prediction market. Trade on real-world events using virtual PRED coins.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-widest">Platform</h3>
                        <ul className="space-y-2">
                            <li><Link href="/markets" className="text-sm text-text-muted hover:text-primary transition-colors">Markets</Link></li>
                            <li><Link href="/leaderboard" className="text-sm text-text-muted hover:text-primary transition-colors">Leaderboard</Link></li>
                            <li><Link href="/login" className="text-sm text-text-muted hover:text-primary transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-widest">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/terms" className="text-sm text-text-muted hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-sm text-text-muted hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Responsible Gaming */}
                    <div>
                        <h3 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-widest">Responsible Gaming</h3>
                        <p className="text-sm text-text-muted">
                            {APP_NAME} is a free-to-play social prediction platform. No real money is involved.
                            Virtual PRED coins have no monetary value. Must be 18+ to participate.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border text-center text-xs text-text-muted/60">
                    © {new Date().getFullYear()} {APP_NAME}. This is an online social game classified under the Online Gaming Act 2025.
                </div>
            </div>
        </footer>
    );
}
