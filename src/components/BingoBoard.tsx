"use client";

import { useGameStore } from "@/store/gameStore";
import Card from "./Card";

export default function BingoBoard() {
  const board = useGameStore((s) => s.board);
  const gridSize = useGameStore((s) => s.gridSize);
  const winningLines = useGameStore((s) => s.winningLines);
  const isBingo = useGameStore((s) => s.isBingo);

  if (board.length === 0) return null;

  const cellSizeClass =
    gridSize === 3
      ? "w-24 h-24 sm:w-28 sm:h-28"
      : gridSize === 4
      ? "w-[4.5rem] h-[4.5rem] sm:w-[5.5rem] sm:h-[5.5rem]"
      : "w-14 h-14 sm:w-[4.2rem] sm:h-[4.2rem]";

  const gapClass = gridSize === 5 ? "gap-1.5" : "gap-2";
  const fontClass =
    gridSize === 5 ? "text-[10px] sm:text-xs" : gridSize === 4 ? "text-xs sm:text-sm" : "text-sm sm:text-base";

  return (
    <div
      className={`grid ${gapClass} p-3 bg-white/60 rounded-2xl shadow-lg backdrop-blur-sm`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {board.flat().map((cell, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const isWinning = winningLines.includes(index);

        return (
          <Card
            key={`${cell.word.id}-${index}`}
            cell={cell}
            row={row}
            col={col}
            isWinning={isWinning}
            isBingo={isBingo}
            sizeClass={cellSizeClass}
            fontClass={fontClass}
          />
        );
      })}
    </div>
  );
}
