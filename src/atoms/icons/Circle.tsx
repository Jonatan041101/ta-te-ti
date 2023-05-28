import React from "react";

interface Props {
  width: number;
}

export default function Circle({ width }: Props) {
  const RADIO = 2.909090909090909;
  const STROKE_WIDTH = 4;
  return (
    <svg height={width} width={width} color="currentColor">
      <circle
        cx="50%"
        cy="50%"
        r={width / RADIO}
        className="circle"
        color="currentColor"
        strokeWidth={width / STROKE_WIDTH}
      ></circle>
    </svg>
  );
}
