import { create } from "zustand";
import words, { Word } from "@/data/words";
import { pickRandom } from "@/utils/shuffle";
import { Cell, checkBingo } from "@/utils/bingoCheck";
import { monsters, Monster } from "@/data/monsters";

export type GridSize = 3 | 4 | 5;
export type GameMode = "en-to-jp" | "jp-to-en" | "audio-to-en";

export interface Reward {
  stars: number;
  items: string[];
}

export interface GachaResult {
  monster: Monster;
  isNew: boolean;
}

interface GameState {
  gridSize: GridSize;
  gameMode: GameMode;
  selectedCategories: string[];
  soundEnabled: boolean;
  bgmEnabled: boolean;

  board: Cell[][];
  currentQuestion: Word | null;
  questionIndex: number;
  questionPool: Word[];
  isBingo: boolean;
  winningLines: number[];
  score: number;
  totalStars: number;
  isPlaying: boolean;
  showReward: boolean;

  collection: number[];
  lastGachaResult: GachaResult | null;

  setGridSize: (size: GridSize) => void;
  setGameMode: (mode: GameMode) => void;
  setSelectedCategories: (cats: string[]) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setBgmEnabled: (enabled: boolean) => void;
  startGame: () => void;
  selectCell: (row: number, col: number) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  closeReward: () => void;
  rollGacha: () => boolean;
  clearGachaResult: () => void;
}

function getFilteredWords(categories: string[]): Word[] {
  if (categories.length === 0 || categories.includes("all")) {
    return words;
  }
  return words.filter((w) => categories.includes(w.category));
}

export const useGameStore = create<GameState>((set, get) => ({
  gridSize: 3,
  gameMode: "en-to-jp",
  selectedCategories: ["all"],
  soundEnabled: true,
  bgmEnabled: false,

  board: [],
  currentQuestion: null,
  questionIndex: 0,
  questionPool: [],
  isBingo: false,
  winningLines: [],
  score: 0,
  totalStars: 0,
  isPlaying: false,
  showReward: false,

  collection: [],
  lastGachaResult: null,

  setGridSize: (size) => set({ gridSize: size }),
  setGameMode: (mode) => set({ gameMode: mode }),
  setSelectedCategories: (cats) => set({ selectedCategories: cats }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setBgmEnabled: (enabled) => set({ bgmEnabled: enabled }),

  startGame: () => {
    const { gridSize, selectedCategories } = get();
    const totalCells = gridSize * gridSize;
    const filtered = getFilteredWords(selectedCategories);
    if (filtered.length === 0) return;

    const poolSize = Math.min(
      filtered.length,
      Math.max(totalCells * 3, 50)
    );
    const selected = pickRandom(filtered, poolSize);
    const boardWords: Word[] = selected.slice(
      0,
      Math.min(totalCells, selected.length)
    );
    while (boardWords.length < totalCells) {
      boardWords.push(pickRandom(filtered, 1)[0]);
    }

    const board: Cell[][] = [];
    for (let r = 0; r < gridSize; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < gridSize; c++) {
        row.push({
          word: boardWords[r * gridSize + c],
          selected: false,
        });
      }
      board.push(row);
    }

    const questionPool = pickRandom(
      boardWords,
      boardWords.length
    );

    set({
      board,
      questionPool,
      questionIndex: 0,
      currentQuestion: questionPool[0],
      isBingo: false,
      winningLines: [],
      score: 0,
      isPlaying: true,
      showReward: false,
    });
  },

  selectCell: (row, col) => {
    const state = get();
    if (state.isBingo) return;

    const { board, currentQuestion } = state;
    const cell = board[row][col];

    if (cell.selected) return;

    const isCorrect = currentQuestion && cell.word.id === currentQuestion.id;

    if (!isCorrect) return;

    const newBoard = board.map((r, ri) =>
      r.map((c, ci) => {
        if (ri === row && ci === col) {
          return { ...c, selected: true };
        }
        return c;
      })
    );

    const result = checkBingo(newBoard);

    const newScore = state.score + 10;

    if (result.isBingo) {
      const flatLines = result.lines.flat();
      set({
        board: newBoard,
        isBingo: true,
        winningLines: flatLines,
        score: newScore,
        totalStars: state.totalStars + Math.ceil(newScore / 10),
        showReward: true,
      });
    } else {
      set({ board: newBoard, score: newScore });
      setTimeout(() => get().nextQuestion(), 300);
    }
  },

  nextQuestion: () => {
    const { questionPool, questionIndex, board } = get();
    const flatBoard = board.flat();
    const unselected = flatBoard.filter((c) => !c.selected);

    if (unselected.length === 0) return;

    const nextUnselected = pickRandom(unselected, 1)[0];

    set({
      currentQuestion: nextUnselected.word,
      questionIndex: questionIndex + 1,
    });
  },

  resetGame: () => {
    set({
      board: [],
      currentQuestion: null,
      questionIndex: 0,
      questionPool: [],
      isBingo: false,
      winningLines: [],
      score: 0,
      isPlaying: false,
      showReward: false,
    });
  },

  closeReward: () => set({ showReward: false }),

  rollGacha: () => {
    const state = get();
    if (state.totalStars < 10) return false;

    const roll = Math.random();
    let rarity: Monster["rarity"];
    if (roll < 0.05) {
      rarity = "Super Rare";
    } else if (roll < 0.30) {
      rarity = "Rare";
    } else {
      rarity = "Common";
    }

    const pool = monsters.filter((m) => m.rarity === rarity);
    const picked = pool[Math.floor(Math.random() * pool.length)];
    const isNew = !state.collection.includes(picked.id);
    const newCollection = isNew ? [...state.collection, picked.id] : state.collection;

    set({
      totalStars: state.totalStars - 10,
      collection: newCollection,
      lastGachaResult: { monster: picked, isNew },
    });
    return true;
  },

  clearGachaResult: () => set({ lastGachaResult: null }),
}));
