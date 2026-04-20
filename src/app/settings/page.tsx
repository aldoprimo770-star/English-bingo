"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGameStore, GridSize, GameMode } from "@/store/gameStore";
import { categories } from "@/data/words";
import Header from "@/components/Header";

export default function SettingsPage() {
  const gridSize = useGameStore((s) => s.gridSize);
  const gameMode = useGameStore((s) => s.gameMode);
  const selectedCategories = useGameStore((s) => s.selectedCategories);
  const soundEnabled = useGameStore((s) => s.soundEnabled);
  const setGridSize = useGameStore((s) => s.setGridSize);
  const setGameMode = useGameStore((s) => s.setGameMode);
  const setSelectedCategories = useGameStore((s) => s.setSelectedCategories);
  const setSoundEnabled = useGameStore((s) => s.setSoundEnabled);
  const startGame = useGameStore((s) => s.startGame);
  const router = useRouter();

  const gridOptions: { size: GridSize; label: string; desc: string }[] = [
    { size: 3, label: "3×3", desc: "かんたん" },
    { size: 4, label: "4×4", desc: "ふつう" },
    { size: 5, label: "5×5", desc: "むずかしい" },
  ];

  const modeOptions: { mode: GameMode; label: string; emoji: string }[] = [
    { mode: "en-to-jp", label: "英語→日本語", emoji: "🇬🇧" },
    { mode: "jp-to-en", label: "日本語→英語", emoji: "🇯🇵" },
    { mode: "audio-to-en", label: "音声→英語", emoji: "🔊" },
  ];

  const toggleCategory = (catId: string) => {
    if (catId === "all") {
      setSelectedCategories(["all"]);
      return;
    }

    let newCats = selectedCategories.filter((c) => c !== "all");
    if (newCats.includes(catId)) {
      newCats = newCats.filter((c) => c !== catId);
    } else {
      newCats.push(catId);
    }

    if (newCats.length === 0) {
      newCats = ["all"];
    }

    setSelectedCategories(newCats);
  };

  const handleStartGame = () => {
    startGame();
    router.push("/game");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 py-6 gap-6 max-w-lg mx-auto w-full">
        <h2 className="text-2xl font-black text-[#5B8C6E]">⚙️ せってい</h2>

        {/* Grid Size */}
        <section className="w-full bg-white/80 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#555] mb-3">📐 ボードのサイズ</h3>
          <div className="flex gap-3">
            {gridOptions.map((opt) => (
              <button
                key={opt.size}
                onClick={() => setGridSize(opt.size)}
                className={`flex-1 py-3 rounded-xl font-bold transition-all duration-200 ${
                  gridSize === opt.size
                    ? "bg-[#B5EAD7] text-[#4A7C5C] shadow-md scale-105"
                    : "bg-[#F5F5F5] text-[#999] hover:bg-[#EAEAEA]"
                }`}
              >
                <div className="text-lg">{opt.label}</div>
                <div className="text-[10px] opacity-70">{opt.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Game Mode */}
        <section className="w-full bg-white/80 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#555] mb-3">🎯 もんだいモード</h3>
          <div className="flex flex-col gap-2">
            {modeOptions.map((opt) => (
              <button
                key={opt.mode}
                onClick={() => setGameMode(opt.mode)}
                className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-200 flex items-center gap-3 ${
                  gameMode === opt.mode
                    ? "bg-[#C7CEEA] text-white shadow-md"
                    : "bg-[#F5F5F5] text-[#999] hover:bg-[#EAEAEA]"
                }`}
              >
                <span className="text-xl">{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Sound */}
        <section className="w-full bg-white/80 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#555] mb-3">🔊 おと</h3>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
              soundEnabled
                ? "bg-[#B5EAD7] text-[#4A7C5C]"
                : "bg-[#F5F5F5] text-[#999]"
            }`}
          >
            {soundEnabled ? "🔊 ON" : "🔇 OFF"}
          </button>
        </section>

        {/* Categories */}
        <section className="w-full bg-white/80 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#555] mb-3">📂 カテゴリ</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected =
                selectedCategories.includes(cat.id) ||
                (cat.id !== "all" && selectedCategories.includes("all"));
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    isSelected
                      ? "bg-[#FFDAC1] text-[#8B6914] shadow-sm"
                      : "bg-[#F5F5F5] text-[#999] hover:bg-[#EAEAEA]"
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Start Game Button */}
        <button
          onClick={handleStartGame}
          className="w-full py-4 bg-[#FFDAC1] hover:bg-[#FFD0B0] active:scale-95
                     text-[#8B6914] font-black text-xl rounded-full shadow-lg
                     transition-all duration-200 hover:shadow-xl"
        >
          🎮 このせっていでスタート！
        </button>

        <Link
          href="/"
          className="text-sm text-[#BBAACC] hover:text-[#9988AA] transition-colors mb-6"
        >
          ← ホームにもどる
        </Link>
      </main>
    </div>
  );
}
