"use client";
import React, { useEffect } from "react";
import Square from "./Square";
import Button from "@/atoms/Button";
import { XO, useBearStore } from "@/store/store";

const conditionWin = [
  [0, 1, 2],
  [0, 3, 6],
  [6, 7, 8],
  [2, 5, 8],
  [1, 4, 7],
  [3, 4, 5],
  [0, 4, 8],
  [2, 4, 6],
];
export interface Plays {
  [key: number]: XO;
}
export type WIN = null | number[];
const BOARD = Array(9).fill(null);
export default function Board() {
  const {
    changeTurn,
    changeWinner,
    changeIsWin,
    changePlays,
    aumentClicks,
    tieGame,
    plays,
    win,
    turn,
    countClicks,
    playerInit,
    countWinPlayer1,
    countWinPlayer2,
    isBot,
  } = useBearStore((state) => state);

  useEffect(() => {
    const prev: XO = turn === "X" ? "O" : "X";
    const winner = getWinner(prev);
    if (winner) {
      changeIsWin(winner);
      changeWinner(prev, playerInit, prev);
      return () => {};
    }
    if (Object.values(plays).length >= 9) {
      tieGame();
    }
    if (isBot && turn !== playerInit) {
      botMove();
    }
  }, [plays, turn]);

  const getWinner = (prev: XO) => {
    const winner = conditionWin.find((comp) =>
      comp.every((cell) => plays[cell] === prev)
    );
    return winner;
  };

  const checkWinningCondition = (testPlays: Plays, player: XO): boolean => {
    const win = conditionWin.some((comp) =>
      comp.every((cell) => testPlays[cell] === player)
    );
    return win;
  };
  const handleClick = (cell: number) => {
    if (plays[cell]) return;

    const newPlays: Plays = { ...plays };

    newPlays[cell] = turn;

    changePlays(newPlays);
    aumentClicks();

    if (turn === "X") {
      return changeTurn("O");
    }

    changeTurn("X");
  };

  const botMove = () => {
    const availableMoves = BOARD.map((_, i) => i);
    const restMoves: number[] = [];

    for (let i = 0; i <= availableMoves.length; i++) {
      if (!plays[availableMoves[i]]) {
        if (typeof availableMoves[i] === "number") {
          restMoves.push(availableMoves[i]);
        }
      }
    }

    // Buscar jugada ganadora para el bot
    const winningMove = findMovigBot(restMoves, turn);
    if (winningMove !== null) {
      handleClick(winningMove);
      return;
    }

    // Buscar jugada de bloqueo para el jugador humano
    const opponent = turn === "X" ? "O" : "X";

    const blockingMove = findMovigBot(restMoves, opponent);
    if (blockingMove !== null) {
      handleClick(blockingMove);
      return;
    }

    // Realizar un movimiento aleatorio
    const randomIndex = Math.floor(Math.random() * restMoves.length);
    const botMove = restMoves[randomIndex];
    handleClick(botMove);
  };

  const findMovigBot = (moves: number[], player: XO): number | null => {
    for (let i = 0; i < moves.length; i++) {
      const testPlays: Plays = { ...plays };
      testPlays[moves[i]] = player;

      if (checkWinningCondition(testPlays, player)) {
        return moves[i];
      }
    }
    return null;
  };

  return (
    <div className="board">
      {BOARD.map((_, i) => (
        <Square
          win={win}
          plays={plays}
          key={i}
          handleClick={handleClick}
          index={i}
        />
      ))}
      <Button
        color={`${playerInit === "X" ? "#31c3be" : "#f2b237"}`}
        value={`${countWinPlayer1}`}
        text={`${playerInit} (Tu)`}
      />
      <Button color="#a8bec9" value={`${countClicks}`} text="Pasos" />
      <Button
        color={`${playerInit === "X" ? "#f2b237" : "#31c3be"}`}
        value={`${countWinPlayer2}`}
        text={`${isBot ? "CPU" : `${playerInit === "X" ? "O" : "X"} (El)`}`}
      />
    </div>
  );
}
