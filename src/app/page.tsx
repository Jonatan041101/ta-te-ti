"use client";
import DashBoard from "@/components/DashBoard";
import Board from "@/components/Board";
import SelectGame from "@/components/SelectGame";
import GameOverC from "@/components/GameOverC";
import { useBearStore } from "@/store/store";

export default function Home() {
  const { gameEnd, inPlay } = useBearStore((state) => state);

  return (
    <main className="main">
      {!inPlay && <SelectGame />}
      {gameEnd && <GameOverC />}
      <div className="main__container">
        <DashBoard />
        <Board />
      </div>
    </main>
  );
}
