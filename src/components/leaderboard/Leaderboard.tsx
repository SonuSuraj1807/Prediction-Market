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
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                <p className="text-gray-500 font-medium">Calculating rankings...</p>
            </div>
        );
    }

    if (!leaderboard || leaderboard.length === 0) {
        return (
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-16 text-center space-y-4">
                <Trophy className="w-12 h-12 text-gray-700 mx-auto" />
                <h3 className="text-xl font-bold text-white">No one on the board yet</h3>
                <p className="text-gray-500 max-w-xs mx-auto">Start trading to claim your spot at the top!</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-900/50 rounded-3xl border border-gray-800 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-800/50 border-b border-gray-800">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Rank</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Predictor</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {leaderboard.map((user, index) => {
                            const rank = index + 1;
                            return (
                                <tr key={user.id} className="hover:bg-indigo-500/5 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm">
                                            {rank === 1 ? <Trophy className="w-5 h-5 text-yellow-500" /> :
                                                rank === 2 ? <Medal className="w-5 h-5 text-gray-400" /> :
                                                    rank === 3 ? <Medal className="w-5 h-5 text-amber-600" /> :
                                                        <span className="text-gray-500">{rank}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Link href={`/profile/${user.id}`} className="flex items-center gap-3 group/link">
                                            <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-500 font-bold border border-gray-700 group-hover/link:border-indigo-500/50 transition-all overflow-hidden">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.display_name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold group-hover/link:text-indigo-400 transition-colors uppercase tracking-tight">
                                                    {user.display_name}
                                                </div>
                                                {rank <= 3 && (
                                                    <div className="text-[10px] text-indigo-500/80 font-bold uppercase tracking-widest">
                                                        Top Performer
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">
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
