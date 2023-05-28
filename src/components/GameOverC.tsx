"use client";
import Button from "@/atoms/Button";
import Cruz from "@/atoms/icons/Cruz";
import React from "react";
import Modal from "./Modal";
import { useBearStore } from "@/store/store";
import Circle from "@/atoms/icons/Circle";

export default function GameOverC() {
  const { winner, resetGame, nextRound, isBot, playerInit } = useBearStore(
    (state) => state
  );

  return (
    <Modal>
      <div className="gameover">
        <h2 className="gameover__h2">
          {isBot
            ? winner === playerInit
              ? "Tu Ganas"
              : "IA Gana"
            : winner === playerInit
            ? "Tu Ganas"
            : "El Gana"}
        </h2>
        <div
          className="gameover__win"
          style={{
            color: `${
              (winner === "X" && "#2cb1ac") ||
              (winner === "O" && "#f2b237") ||
              "#9aaeb8"
            }`,
          }}
        >
          {winner === "X" && <Cruz width={30} />}
          {winner === "O" && <Circle width={32} />}
          <span className="gameover__span">
            {!winner ? "Empate en el Round" : "Gana este round"}
          </span>
        </div>
        <div className="gameover__buttons">
          <div className="gameover__out">
            <Button
              text="Salir"
              color="#a8bec9"
              value=""
              shadow="#809ba6"
              handleClick={resetGame}
            />
          </div>
          <div className="gameover__round">
            <Button
              text="Siguiente Round"
              color="#f2b237"
              value=""
              shadow="#cc8b13"
              handleClick={() => nextRound(winner === "X" ? "O" : "X")}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
