import { useEffect } from 'react';
import { useGameStore } from '@/lib/store';

export function useGameLoop() {
    const tick = useGameStore((state) => state.tick);
    const isDead = useGameStore((state) => state.isDead);

    useEffect(() => {
        if (isDead) return;

        const interval = setInterval(() => {
            tick();
        }, 3000); // Tick every 3 seconds (fast for testing, maybe slow down later)

        return () => clearInterval(interval);
    }, [tick, isDead]);
}
