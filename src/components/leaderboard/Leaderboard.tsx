'use client';

import React from 'react';
import { trpc } from '@/utils/trpc';
import { formatPred } from '@/lib/utils';
import { Trophy, Medal, User, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function Leaderboard() {
    const { data: leaderboard, isLoading } = trpc.user.getLeaderboard.useQuery({ limit: 50 });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-text-muted font-medium">Calculating rankings...</p>
            </div>
        );
    }

    if (!leaderboard || leaderboard.length === 0) {
        return (
            <div className="bg-surface-raised border border-border rounded-3xl p-16 text-center space-y-4">
                <Trophy className="w-12 h-12 text-border mx-auto" />
                <h3 className="text-xl font-bold text-text">No one on the board yet</h3>
                <p className="text-text-muted max-w-xs mx-auto">Start trading to claim your spot at the top!</p>
            </div>
        );
    }

    return (
        <div className="bg-surface border border-border rounded-3xl overflow-hidden backdrop-blur-sm transition-colors">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-surface-raised border-b border-border">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">Rank</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted">Predictor</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-muted text-right">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {leaderboard.map((user, index) => {
                            const rank = index + 1;
                            return (
                                <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm">
                                            {rank === 1 ? <Trophy className="w-5 h-5 text-yellow-500" /> :
                                                rank === 2 ? <Medal className="w-5 h-5 text-gray-400" /> :
                                                    rank === 3 ? <Medal className="w-5 h-5 text-amber-600" /> :
                                                        <span className="text-text-muted">{rank}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Link href={`/profile/${user.id}`} className="flex items-center gap-3 group/link">
                                            <div className="w-10 h-10 rounded-xl bg-surface-higher flex items-center justify-center text-text-muted font-bold border border-border group-hover/link:border-primary transition-all overflow-hidden">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.display_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-text font-bold group-hover/link:text-primary transition-colors uppercase tracking-tight">
                                                    {user.display_name}
                                                </div>
                                                {rank <= 3 && (
                                                    <div className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">
                                                        Top Performer
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="text-lg font-black text-text group-hover:text-primary transition-colors">
                                            {formatPred(user.balance || 0)}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
