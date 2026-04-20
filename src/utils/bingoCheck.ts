export interface Cell {
  word: import("@/data/words").Word;
  selected: boolean;
}

export function checkBingo(board: Cell[][]): { isBingo: boolean; lines: number[][] } {
  const size = board.length;
  const winningLines: number[][] = [];

  for (let row = 0; row < size; row++) {
    if (board[row].every((cell) => cell.selected)) {
      winningLines.push(board[row].map((_, col) => row * size + col));
    }
  }

  for (let col = 0; col < size; col++) {
    if (board.every((row) => row[col].selected)) {
      winningLines.push(board.map((_, row) => row * size + col));
    }
  }

  if (board.every((row, i) => row[i].selected)) {
    winningLines.push(board.map((_, i) => i * size + i));
  }

  if (board.every((row, i) => row[size - 1 - i].selected)) {
    winningLines.push(board.map((_, i) => i * size + (size - 1 - i)));
  }

  return { isBingo: winningLines.length > 0, lines: winningLines };
}
