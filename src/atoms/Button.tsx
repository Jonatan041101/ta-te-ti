import React from "react";
type Colors = "#f2b237" | "#31c3be" | "#a8bec9";
type Shadow = "#cc8b13" | "#1e8786" | "#809ba6";
interface Props {
  text: string;
  value: string;
  color: Colors;
  shadow?: Shadow;
  handleClick?: () => void;
}
export default function Button({
  text,
  value,
  color,
  shadow,
  handleClick = () => {},
}: Props) {
  return (
    <div
      onClick={handleClick}
      className="btn"
      style={{
        background: color,
        boxShadow: `${shadow ? `0 0.4em 0 ${shadow}` : "none"}`,
      }}
    >
      <span>{text}</span>
      <span className="btn__value">{value}</span>
    </div>
  );
}
