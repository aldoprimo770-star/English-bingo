"use client";

import { useGameStore } from "@/store/gameStore";
import { monsters } from "@/data/monsters";

const rarityColors: Record<string, string> = {
  Common: "text-[#888]",
  Rare: "text-[#4A90D9]",
  "Super Rare": "text-[#D4AF37]",
};

const rarityBg: Record<string, string> = {
  Common: "bg-[#F5F5F5]",
  Rare: "bg-[#E8F0FE]",
  "Super Rare": "bg-gradient-to-br from-[#FFF8E1] to-[#FFE082]",
};

export default function GachaSection() {
  const totalStars = useGameStore((s) => s.totalStars);
  const collection = useGameStore((s) => s.collection);
  const lastGachaResult = useGameStore((s) => s.lastGachaResult);
  const rollGacha = useGameStore((s) => s.rollGacha);
  const clearGachaResult = useGameStore((s) => s.clearGachaResult);

  const handleRoll = () => {
    if (totalStars < 10) {
      alert("スターが足りません！ビンゴで集めよう！");
      return;
    }
    clearGachaResult();
    setTimeout(() => rollGacha(), 50);
  };

  const collectedMonsters = monsters.filter((m) => collection.includes(m.id));

  return (
    <div className="w-full max-w-xs flex flex-col items-center gap-4">
      <button
        onClick={handleRoll}
        disabled={totalStars < 10}
        className={`w-full py-3 rounded-full font-bold text-lg shadow-md transition-all duration-200
          ${
            totalStars >= 10
              ? "bg-[#B5EAD7] hover:bg-[#9FE0C5] active:scale-95 text-[#2D5F3F]"
              : "bg-[#E8E8E8] text-[#AAA] cursor-not-allowed"
          }`}
      >
        🎰 ガチャ (10⭐)
      </button>

      {lastGachaResult && (
        <div
          className={`w-full rounded-2xl p-5 text-center shadow-lg ${rarityBg[lastGachaResult.monster.rarity]}`}
        >
          {lastGachaResult.monster.rarity === "Super Rare" && (
            <p className="text-sm font-bold text-[#D4AF37] mb-1">
              ✨ SUPER RARE! ✨
            </p>
          )}
          <div className="text-6xl mb-2">{lastGachaResult.monster.emoji}</div>
          <p className="font-bold text-lg text-[#333]">
            {lastGachaResult.monster.name}
          </p>
          <p
            className={`text-sm font-bold ${rarityColors[lastGachaResult.monster.rarity]}`}
          >
            {lastGachaResult.monster.rarity}
          </p>
          {lastGachaResult.isNew && (
            <span className="inline-block mt-2 bg-[#FF6B6B] text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW!
            </span>
          )}
        </div>
      )}

      {collectedMonsters.length > 0 && (
        <div className="w-full bg-white/80 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-[#555] text-sm mb-3 text-center">
            📦 コレクション ({collectedMonsters.length}/{monsters.length})
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {collectedMonsters.map((m) => (
              <div
                key={m.id}
                className="flex flex-col items-center gap-0.5"
                title={`${m.name} (${m.rarity})`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span
                  className={`text-[9px] font-bold leading-tight text-center ${rarityColors[m.rarity]}`}
                >
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
