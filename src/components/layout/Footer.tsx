import { APP_NAME } from '@/lib/constants';
import { TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-indigo-400" />
                            <span className="text-lg font-bold text-white">{APP_NAME}</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Free-to-play prediction market. Trade on real-world events using virtual PRED coins.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 mb-4">Platform</h3>
                        <ul className="space-y-2">
                            <li><Link href="/markets" className="text-sm text-gray-500 hover:text-gray-300">Markets</Link></li>
                            <li><Link href="/leaderboard" className="text-sm text-gray-500 hover:text-gray-300">Leaderboard</Link></li>
                            <li><Link href="/login" className="text-sm text-gray-500 hover:text-gray-300">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link href="/terms" className="text-sm text-gray-500 hover:text-gray-300">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-300">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Responsible Gaming */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 mb-4">Responsible Gaming</h3>
                        <p className="text-sm text-gray-500">
                            {APP_NAME} is a free-to-play social prediction platform. No real money is involved.
                            Virtual PRED coins have no monetary value. Must be 18+ to participate.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
                    © {new Date().getFullYear()} {APP_NAME}. This is an online social game classified under the Online Gaming Act 2025.
                </div>
            </div>
        </footer>
    );
}
