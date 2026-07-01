"use client";

import { useGameLoop } from "@/hooks/useGameLoop";
import { useGameStore } from "@/lib/store";
import { PetDisplay } from "@/components/game/PetDisplay";
import { StatsPanel } from "@/components/game/StatsPanel";
import { RetroButton } from "@/components/ui/RetroButton";
import { PixelCard } from "@/components/ui/PixelCard";
import { ChatBox } from "@/components/chat/ChatBox";

export default function Home() {
  useGameLoop();
  const { feed, play, sleep, wake, clean, isSleeping } = useGameStore();

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-xl text-retro-pink drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">WEBAGATCHI</h1>
        <div className="text-[10px] text-retro-cyan animate-pulse">ONLINE</div>
      </header>

      {/* Main Pet View */}
      <section className="flex-1 flex flex-col gap-4 min-h-0">
        <PetDisplay />
        <StatsPanel />
      </section>

      {/* Controls */}
      <PixelCard className="grid grid-cols-2 gap-2" variant="default">
        <RetroButton onClick={feed} disabled={isSleeping}>FEED</RetroButton>
        <RetroButton onClick={play} disabled={isSleeping} variant="secondary">PLAY</RetroButton>
        <RetroButton onClick={isSleeping ? wake : sleep} variant="primary">
          {isSleeping ? "WAKE" : "SLEEP"}
        </RetroButton>
        <RetroButton onClick={clean} disabled={isSleeping} variant="danger">CLEAN</RetroButton>
      </PixelCard>

      {/* Chat Interface */}
      <ChatBox />
    </div>
  );
}
