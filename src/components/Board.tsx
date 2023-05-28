"use client";
import React, { useEffect, useState } from "react";
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
    const prev = turn === "X" ? "O" : "X";
    const winner = conditionWin.find((comp) =>
      comp.every((cell) => plays[cell] === prev)
    );
    if (winner) {
      changeIsWin(winner);
      changeWinner(prev, playerInit, prev);
    }
    if (Object.values(plays).length >= 9) {
      tieGame();
    }
    if (isBot && turn !== playerInit) {
      botMove();
    }
  }, [plays, turn]);

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

    const randomIndex = Math.floor(Math.random() * restMoves.length);
    const botMove = restMoves[randomIndex];
    handleClick(botMove);
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
      <Button color="#a8bec9" value={`${countClicks}`} text="Ties" />
      <Button
        color={`${playerInit === "X" ? "#f2b237" : "#31c3be"}`}
        value={`${countWinPlayer2}`}
        text={`${isBot ? "CPU" : `${playerInit === "X" ? "O" : "X"} (El)`}`}
      />
    </div>
  );
}
