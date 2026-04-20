"use client";

import { useGameStore } from "@/store/gameStore";
import { Cell } from "@/utils/bingoCheck";
import { speakWord } from "@/utils/speech";

interface CardProps {
  cell: Cell;
  row: number;
  col: number;
  isWinning: boolean;
  isBingo: boolean;
  sizeClass: string;
  fontClass: string;
}

export default function Card({
  cell,
  row,
  col,
  isWinning,
  isBingo,
  sizeClass,
  fontClass,
}: CardProps) {
  const selectCell = useGameStore((s) => s.selectCell);
  const gameMode = useGameStore((s) => s.gameMode);
  const soundEnabled = useGameStore((s) => s.soundEnabled);

  const handleClick = () => {
    if (cell.selected || isBingo) return;

    if (soundEnabled) {
      speakWord(cell.word.word);
    }

    selectCell(row, col);
  };

  const displayText =
    gameMode === "en-to-jp" ? cell.word.meaning : cell.word.word;

  let bgColor = "bg-white hover:bg-[#F0F7F4] border-2 border-[#E8E8E8] hover:border-[#B5EAD7]";
  let textColor = "text-[#555]";
  if (cell.selected && isWinning) {
    bgColor = "bg-gradient-to-br from-[#FFD700] to-[#FFA500] border-2 border-[#FF8C00] scale-105";
    textColor = "text-white";
  } else if (cell.selected) {
    bgColor = "bg-[#B5EAD7] border-2 border-[#8FD4B4]";
    textColor = "text-[#2D5F3F]";
  }

  return (
    <button
      onClick={handleClick}
      disabled={cell.selected || isBingo}
      className={`
        ${sizeClass} ${bgColor} ${fontClass}
        rounded-xl flex items-center justify-center
        font-bold text-center p-1
        transition-all duration-200 ease-in-out
        ${!cell.selected && !isBingo ? "active:scale-95 cursor-pointer" : ""}
        ${isWinning ? "animate-pulse shadow-lg" : "shadow-sm"}
        ${textColor}
        select-none
      `}
    >
      <span className="leading-tight break-all">{displayText}</span>
    </button>
  );
}
