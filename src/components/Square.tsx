"use client";
import Circle from "@/atoms/icons/Circle";
import Cruz from "@/atoms/icons/Cruz";
import React from "react";
import { Plays, WIN } from "./Board";

interface Props {
  handleClick: (i: number) => void;
  index: number;
  plays: Plays;
  win: WIN;
}

export default function Square({ handleClick, index, plays, win }: Props) {
  return (
    <div className="square" onClick={() => handleClick(index)}>
      {plays[index] === "X" && (
        <i
          className="square__cruz"
          data-wincruz={win ? win.includes(index) : false}
        >
          <Cruz width={80} />
        </i>
      )}
      {plays[index] === "O" && (
        <i
          className="square__circle"
          data-wincircle={win ? win.includes(index) : false}
        >
          <Circle width={84} />
        </i>
      )}
    </div>
  );
}
