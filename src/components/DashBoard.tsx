"use client";
import Circle from "@/atoms/icons/Circle";
import Cruz from "@/atoms/icons/Cruz";
import Reload from "@/atoms/icons/Reload";
import React from "react";
import IconsT from "./IconsT";
import { useBearStore } from "@/store/store";

export default function DashBoard() {
  const { turn, resetGame } = useBearStore((state) => state);
  return (
    <div className="dashboard">
      <IconsT />
      <div className="dashboard__turn">
        <span className="dashboard__span">TURNO DE</span>
        {turn === "X" && <Cruz width={15} />}
        {turn === "O" && <Circle width={16} />}
      </div>
      <div className="dashboard__reload" onClick={resetGame}>
        <button>
          <Reload width={15} />
        </button>
      </div>
    </div>
  );
}
