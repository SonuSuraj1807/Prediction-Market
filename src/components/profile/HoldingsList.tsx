'use client';

import React from 'react';
import { trpc } from '@/utils/trpc';
import { PositionCard } from './PositionCard';
import { Loader2 } from 'lucide-react';

interface HoldingsListProps {
    userId: string;
}

export function HoldingsList({ }: HoldingsListProps) {
    // Reusing getPositions which returns active holdings for the CURRENT user
    // In a real profile, this might need an input for userId if viewing others
    // But usually holdings are private or shared.
    const { data: positions, isLoading } = trpc.trade.getPositions.useQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
        );
    }

    if (!positions || positions.length === 0) {
        return (
            <div className="p-12 text-center bg-gray-900/40 border border-gray-800 rounded-[3rem]">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-white font-bold text-lg">No active positions</h3>
                <p className="text-gray-500 text-sm mt-1">Start predicting to see your holdings here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {positions.map((pos) => (
                <PositionCard key={pos.id} position={pos} />
            ))}
        </div>
    );
}
