"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import Header from "@/components/Header";
import BingoBoard from "@/components/BingoBoard";
import QuestionDisplay from "@/components/QuestionDisplay";
import RewardModal from "@/components/RewardModal";

export default function GamePage() {
  const isPlaying = useGameStore((s) => s.isPlaying);
  const score = useGameStore((s) => s.score);
  const gridSize = useGameStore((s) => s.gridSize);
  const gameMode = useGameStore((s) => s.gameMode);
  const startGame = useGameStore((s) => s.startGame);
  const router = useRouter();

  useEffect(() => {
    if (!isPlaying) {
      startGame();
    }
  }, [isPlaying, startGame]);

  const modeLabels: Record<string, string> = {
    "en-to-jp": "英語 → 日本語",
    "jp-to-en": "日本語 → 英語",
    "audio-to-en": "音声 → 英語",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-4 gap-4">
        {/* Game info bar */}
        <div className="flex items-center justify-between w-full max-w-md px-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#B5EAD7] text-[#4A7C5C] text-xs font-bold px-2.5 py-1 rounded-full">
              {gridSize}×{gridSize}
            </span>
            <span className="bg-[#C7CEEA] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {modeLabels[gameMode]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full shadow-sm">
            <span className="text-sm">🏆</span>
            <span className="font-bold text-[#E8A87C] text-sm">{score}</span>
          </div>
        </div>

        {/* Question */}
        <QuestionDisplay />

        {/* Bingo Board */}
        <BingoBoard />

        {/* Back button */}
        <button
          onClick={() => {
            useGameStore.getState().resetGame();
            router.push("/");
          }}
          className="mt-2 text-sm text-[#BBAACC] hover:text-[#9988AA] transition-colors"
        >
          ← ホームにもどる
        </button>
      </main>

      <RewardModal />
    </div>
  );
}
