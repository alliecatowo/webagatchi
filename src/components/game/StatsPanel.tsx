import React from 'react';
import { useGameStore } from '@/lib/store';
import { PixelCard } from '@/components/ui/PixelCard';

export function StatsPanel() {
    const stats = useGameStore((state) => state.stats);

    return (
        <PixelCard className="w-full space-y-2" variant="default">
            <StatBar label="Hunger" value={stats.hunger} color="bg-retro-pink" />
            <StatBar label="Happiness" value={stats.happiness} color="bg-retro-cyan" />
            <StatBar label="Energy" value={stats.energy} color="bg-retro-purple" />
            <StatBar label="Hygiene" value={stats.hygiene} color="bg-white" />
        </PixelCard>
    );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider">
            <span className="w-20">{label}</span>
            <div className="flex-1 h-3 bg-black/50 border border-white/20 relative">
                <div
                    className={`h-full ${color} transition-all duration-500`}
                    style={{ width: `${value}%` }}
                />
            </div>
            <span className="w-8 text-right">{Math.round(value)}%</span>
        </div>
    );
}
