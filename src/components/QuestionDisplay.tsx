"use client";

import { useGameStore } from "@/store/gameStore";
import { speakWord } from "@/utils/speech";
import { useEffect } from "react";

export default function QuestionDisplay() {
  const currentQuestion = useGameStore((s) => s.currentQuestion);
  const gameMode = useGameStore((s) => s.gameMode);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const isBingo = useGameStore((s) => s.isBingo);

  useEffect(() => {
    if (
      currentQuestion &&
      soundEnabled &&
      gameMode === "audio-to-en" &&
      !isBingo
    ) {
      const timer = setTimeout(() => {
        speakWord(currentQuestion.word);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, gameMode, soundEnabled, isBingo]);

  if (!currentQuestion) return null;

  const getDisplayContent = () => {
    switch (gameMode) {
      case "en-to-jp":
        return {
          label: "この英語の意味は？",
          main: currentQuestion.word,
          sub: `(${currentQuestion.category})`,
        };
      case "jp-to-en":
        return {
          label: "英語で何と言う？",
          main: currentQuestion.meaning,
          sub: `(${currentQuestion.category})`,
        };
      case "audio-to-en":
        return {
          label: "聞こえた英語をタップ！",
          main: "🔊",
          sub: "もう一度聞く →",
        };
    }
  };

  const content = getDisplayContent();

  const handleSpeakAgain = () => {
    if (currentQuestion && soundEnabled) {
      speakWord(currentQuestion.word);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 text-center w-full max-w-md mx-auto">
      <p className="text-xs text-[#888] mb-1">{content.label}</p>
      <div className="flex items-center justify-center gap-2">
        <p
          className={`font-bold text-[#333] ${
            gameMode === "audio-to-en" ? "text-5xl cursor-pointer" : "text-2xl"
          }`}
          onClick={gameMode === "audio-to-en" ? handleSpeakAgain : undefined}
        >
          {content.main}
        </p>
        {gameMode !== "audio-to-en" && soundEnabled && (
          <button
            onClick={handleSpeakAgain}
            className="w-8 h-8 rounded-full bg-[#C7CEEA] flex items-center justify-center hover:bg-[#B5C4E0] transition-colors"
          >
            🔊
          </button>
        )}
      </div>
      {gameMode === "audio-to-en" && (
        <button
          onClick={handleSpeakAgain}
          className="mt-2 text-xs text-[#C7CEEA] hover:text-[#8B9DC3] transition-colors"
        >
          {content.sub}
        </button>
      )}
    </div>
  );
}
