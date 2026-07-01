import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PetStage = 'egg' | 'baby' | 'child' | 'teen' | 'adult';

interface PetStats {
    hunger: number;    // 0-100 (0 = starving, 100 = full)
    happiness: number; // 0-100 (0 = sad, 100 = happy)
    energy: number;    // 0-100 (0 = exhausted, 100 = energetic)
    hygiene: number;   // 0-100 (0 = dirty, 100 = clean)
}

interface GameState {
    stats: PetStats;
    age: number; // in ticks
    stage: PetStage;
    isSleeping: boolean;
    isDead: boolean;
    name: string;

    // Actions
    feed: () => void;
    play: () => void;
    sleep: () => void;
    wake: () => void;
    clean: () => void;
    tick: () => void; // Called every game tick
    reset: () => void;
    setName: (name: string) => void;
}

const MAX_STAT = 100;
const DECAY_RATES = {
    hunger: 0.5,
    happiness: 0.3,
    energy: 0.1,
    hygiene: 0.2,
};

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            stats: {
                hunger: 80,
                happiness: 80,
                energy: 100,
                hygiene: 100,
            },
            age: 0,
            stage: 'baby', // Start as baby for now
            isSleeping: false,
            isDead: false,
            name: 'Webagatchi',

            feed: () => set((state) => ({
                stats: {
                    ...state.stats,
                    hunger: Math.min(state.stats.hunger + 20, MAX_STAT),
                    energy: Math.min(state.stats.energy + 5, MAX_STAT),
                }
            })),

            play: () => set((state) => ({
                stats: {
                    ...state.stats,
                    happiness: Math.min(state.stats.happiness + 15, MAX_STAT),
                    energy: Math.max(state.stats.energy - 10, 0),
                    hunger: Math.max(state.stats.hunger - 5, 0),
                }
            })),

            sleep: () => set({ isSleeping: true }),

            wake: () => set({ isSleeping: false }),

            clean: () => set((state) => ({
                stats: {
                    ...state.stats,
                    hygiene: MAX_STAT,
                }
            })),

            tick: () => set((state) => {
                if (state.isDead) return state;
                if (state.isSleeping) {
                    // Recover energy while sleeping, slower hunger decay
                    return {
                        stats: {
                            ...state.stats,
                            energy: Math.min(state.stats.energy + 2, MAX_STAT),
                            hunger: Math.max(state.stats.hunger - (DECAY_RATES.hunger * 0.5), 0),
                        },
                        age: state.age + 1,
                    };
                }

                const newStats = {
                    hunger: Math.max(state.stats.hunger - DECAY_RATES.hunger, 0),
                    happiness: Math.max(state.stats.happiness - DECAY_RATES.happiness, 0),
                    energy: Math.max(state.stats.energy - DECAY_RATES.energy, 0),
                    hygiene: Math.max(state.stats.hygiene - DECAY_RATES.hygiene, 0),
                };

                // Check death condition
                if (newStats.hunger <= 0 || newStats.energy <= 0) {
                    // Maybe not die immediately, but for now let's keep it simple
                    // return { ...state, isDead: true, stats: newStats };
                }

                return {
                    stats: newStats,
                    age: state.age + 1,
                };
            }),

            reset: () => set({
                stats: { hunger: 80, happiness: 80, energy: 100, hygiene: 100 },
                age: 0,
                stage: 'baby',
                isSleeping: false,
                isDead: false,
            }),

            setName: (name) => set({ name }),
        }),
        {
            name: 'webagatchi-storage',
        }
    )
);
