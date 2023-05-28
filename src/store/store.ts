import { Plays } from "@/components/Board";
import { StateCreator, create } from "zustand";
export type XO = "X" | "O";

interface Tateti {
  turn: XO;
  playerInit: XO;
  winner: XO | null;
  win: null | number[];
  plays: Plays;
  countWinPlayer1: number;
  countWinPlayer2: number;
  countClicks: number;
  isBot: boolean;
  inPlay: boolean;
  gameEnd: boolean;
  changeIsWin: (win: number[]) => void;
  changeTurn: (turn: XO) => void;
  changeWinner: (win: XO, playerInit: XO, turn: XO) => void;
  changePlays: (plays: Plays) => void;
  nextRound: () => void;
  resetGame: () => void;
  playToGame: (isBot: boolean) => void;
  aumentClicks: () => void;
  selectIcon: (player: XO) => void;
  tieGame: () => void;
}

const sliceTateti: StateCreator<Tateti> = (set) => ({
  turn: "X",
  playerInit: "X",
  winner: null,
  win: null,
  gameEnd: false,
  plays: {},
  countClicks: 0,
  countWinPlayer1: 0,
  countWinPlayer2: 0,
  isBot: false,
  inPlay: false,
  aumentClicks: () => {
    set((state) => ({
      ...state,
      countClicks: state.countClicks + 1,
    }));
  },
  changeTurn: (turn) => {
    set((state) => ({ ...state, turn }));
  },
  selectIcon: (player) => {
    set((state) => ({ ...state, turn: player, playerInit: player }));
  },
  changeWinner: (winner, playerInit, turn) => {
    if (playerInit === turn) {
      set((state) => ({
        ...state,
        countWinPlayer1: state.countWinPlayer1 + 1,
        winner,
        gameEnd: true,
      }));
    } else {
      set((state) => ({
        ...state,
        countWinPlayer2: state.countWinPlayer2 + 1,
        winner,
        gameEnd: true,
      }));
    }
  },
  changeIsWin: (win) => {
    set((state) => ({ ...state, win }));
  },
  changePlays: (plays) => {
    set((state) => ({ ...state, plays }));
  },
  nextRound: () => {
    set((state) => ({
      ...state,
      winner: null,
      gameEnd: false,
      win: null,
      plays: {},
      turn: "X",
    }));
  },
  resetGame: () => {
    set((state) => ({
      ...state,
      winner: null,
      gameEnd: false,
      win: null,
      plays: {},
      turn: "X",
      countClicks: 0,
      countWinPlayer1: 0,
      countWinPlayer2: 0,
    }));
  },
  playToGame: (isBot) => {
    set((state) => ({ ...state, isBot, inPlay: true }));
  },
  tieGame: () => {
    set((state) => ({ ...state, gameEnd: true }));
  },
});

export const useBearStore = create<Tateti>((...set) => ({
  ...sliceTateti(...set),
}));
