"use client";

import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

export default function Header() {
  const totalStars = useGameStore((s) => s.totalStars);
  const isPlaying = useGameStore((s) => s.isPlaying);
  const resetGame = useGameStore((s) => s.resetGame);

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" onClick={() => isPlaying && resetGame()}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <div>
            <h1 className="text-lg font-bold text-[#5B8C6E] leading-tight tracking-tight">
              ALDO PRIMO
            </h1>
            <p className="text-[10px] text-[#8B8B8B] leading-none">
              English Bingo
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-[#FFF6F9] px-3 py-1.5 rounded-full">
          <span className="text-lg">⭐</span>
          <span className="font-bold text-[#E8A87C] text-sm">{totalStars}</span>
        </div>
        <Link
          href="/settings"
          className="w-9 h-9 rounded-full bg-[#C7CEEA] flex items-center justify-center hover:bg-[#B5C4E0] transition-colors"
        >
          <span className="text-lg">⚙️</span>
        </Link>
      </div>
    </header>
  );
}
