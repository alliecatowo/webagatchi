import React from 'react';
import { useGameStore } from '@/lib/store';
import { PixelCard } from '@/components/ui/PixelCard';

export function PetDisplay() {
    const { stage, isSleeping, isDead } = useGameStore();

    // Placeholder for actual sprites
    // In a real app, we'd map stage/state to image URLs or Sprite components

    return (
        <PixelCard className="w-full aspect-square flex items-center justify-center bg-retro-bg relative overflow-hidden" variant="purple">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-retro-purple via-transparent to-transparent" />

            <div className={`
        relative z-10 text-6xl transition-transform duration-500
        ${isSleeping ? 'animate-pulse' : 'animate-bounce'}
      `}>
                {isDead ? '💀' :
                    isSleeping ? '💤' :
                        stage === 'egg' ? '🥚' :
                            stage === 'baby' ? '👶' :
                                '👾'}
            </div>

            {isSleeping && (
                <div className="absolute top-1/4 right-1/4 text-2xl animate-ping">z</div>
            )}
        </PixelCard>
    );
}
