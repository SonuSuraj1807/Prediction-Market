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
        <div className="card-modern overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-surface-raised/50 border-b border-border">
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Rank</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">Predictor</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted text-right">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {leaderboard.map((user, index) => {
                            const rank = index + 1;
                            return (
                                <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-6 h-6 rounded font-bold text-xs">
                                                {rank === 1 ? <Trophy className="w-4 h-4 text-emerald-400" /> :
                                                    rank === 2 ? <Medal className="w-4 h-4 text-primary" /> :
                                                        rank === 3 ? <Medal className="w-4 h-4 text-text-muted" /> :
                                                            <span className="text-[10px] font-bold text-text-muted/60">{rank}</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/profile/${user.id}`} className="flex items-center gap-3 group/link">
                                            <div className="w-8 h-8 rounded-lg bg-surface-raised flex items-center justify-center text-text-muted font-bold border border-border group-hover/link:border-primary transition-all overflow-hidden">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.display_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div className="text-xs font-bold text-text group-hover/link:text-primary transition-colors tracking-tight">
                                                {user.display_name}
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="text-sm font-bold text-text tabular-nums group-hover:text-primary transition-colors">
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
