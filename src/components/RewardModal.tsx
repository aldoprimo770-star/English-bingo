"use client";

import { useGameStore } from "@/store/gameStore";
import { useEffect, useRef } from "react";

export default function RewardModal() {
  const showReward = useGameStore((s) => s.showReward);
  const score = useGameStore((s) => s.score);
  const closeReward = useGameStore((s) => s.closeReward);
  const resetGame = useGameStore((s) => s.resetGame);
  const startGame = useGameStore((s) => s.startGame);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (showReward && !hasPlayedRef.current) {
      hasPlayedRef.current = true;

      import("canvas-confetti").then(({ default: confetti }) => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#B5EAD7", "#C7CEEA", "#FFDAC1", "#FFB7B2", "#E2F0CB"],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#B5EAD7", "#C7CEEA", "#FFDAC1", "#FFB7B2", "#E2F0CB"],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      }).catch(() => {});

      if (typeof window !== "undefined" && "AudioContext" in window) {
        try {
          const ctx = new AudioContext();
          const notes = [523.25, 659.25, 783.99, 1046.5];
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = freq;
            osc.type = "sine";
            gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(
              0.001,
              ctx.currentTime + i * 0.15 + 0.5
            );
            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + i * 0.15 + 0.5);
          });
        } catch {
          // Audio not supported
        }
      }
    }

    if (!showReward) {
      hasPlayedRef.current = false;
    }
  }, [showReward]);

  if (!showReward) return null;

  const starsEarned = Math.ceil(score / 10);

  const handlePlayAgain = () => {
    closeReward();
    resetGame();
    startGame();
  };

  const handleGoHome = () => {
    closeReward();
    resetGame();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center animate-bounce-in">
        <div className="text-6xl mb-4 animate-spin-slow">🎉</div>
        <h2 className="text-3xl font-bold text-[#5B8C6E] mb-2">BINGO!</h2>
        <p className="text-[#888] mb-4">すごい！ビンゴ達成！</p>

        <div className="bg-[#FFF6F9] rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">⭐</span>
            <span className="text-4xl font-bold text-[#E8A87C]">
              +{starsEarned}
            </span>
          </div>
          <p className="text-sm text-[#888]">スターを獲得！</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handlePlayAgain}
            className="w-full py-3 bg-[#FFDAC1] hover:bg-[#FFD0B0] text-[#8B6914] font-bold rounded-full transition-colors text-lg shadow-md"
          >
            もう一回あそぶ！
          </button>
          <button
            onClick={handleGoHome}
            className="w-full py-2.5 bg-[#C7CEEA] hover:bg-[#B5C4E0] text-white font-bold rounded-full transition-colors"
          >
            ホームにもどる
          </button>
        </div>
      </div>
    </div>
  );
}
