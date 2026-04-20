"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import { preloadVoices } from "@/utils/speech";
import GachaSection from "@/components/GachaSection";

export default function Home() {
  const totalStars = useGameStore((s) => s.totalStars);
  const startGame = useGameStore((s) => s.startGame);
  const router = useRouter();

  useEffect(() => {
    preloadVoices();
  }, []);

  const handleStart = () => {
    try {
      startGame();
      router.push("/game");
    } catch (e) {
      console.error("Start game error:", e);
      router.push("/game");
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-6 py-12">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-4xl animate-float opacity-50">
        🌟
      </div>
      <div
        className="absolute top-20 right-12 text-3xl animate-float opacity-40"
        style={{ animationDelay: "1s" }}
      >
        🎈
      </div>
      <div
        className="absolute bottom-20 left-16 text-3xl animate-float opacity-40"
        style={{ animationDelay: "0.5s" }}
      >
        📚
      </div>
      <div
        className="absolute bottom-32 right-10 text-3xl animate-float opacity-40"
        style={{ animationDelay: "1.5s" }}
      >
        ✨
      </div>

      {/* Logo area */}
      <div className="text-center mb-10 animate-bounce-in">
        <div className="text-6xl mb-4 animate-wiggle">🎯</div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#5B8C6E] tracking-tight mb-1">
          ALDO PRIMO
        </h1>
        <p className="text-lg sm:text-xl text-[#C7CEEA] font-bold">
          English Bingo Game
        </p>
      </div>

      {/* Stars display */}
      {totalStars > 0 && (
        <div className="flex items-center gap-2 bg-white/80 px-5 py-2 rounded-full shadow-sm mb-8">
          <span className="text-2xl">⭐</span>
          <span className="font-bold text-[#E8A87C] text-lg">
            {totalStars} スター
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={handleStart}
          className="w-full py-4 bg-[#FFDAC1] hover:bg-[#FFD0B0] active:scale-95
                     text-[#8B6914] font-black text-xl rounded-full shadow-lg
                     transition-all duration-200 hover:shadow-xl"
        >
          🎮 スタート！
        </button>

        <Link
          href="/settings"
          className="w-full py-3.5 bg-[#C7CEEA] hover:bg-[#B5C4E0] active:scale-95
                     text-white font-bold text-lg rounded-full shadow-md
                     transition-all duration-200 text-center"
        >
          ⚙️ せってい
        </Link>
      </div>

      {/* Gacha */}
      <div className="mt-8">
        <GachaSection />
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-[#CCBBCC]">
        🌸 たのしく英語をまなぼう！ 🌸
      </p>
    </div>
  );
}
