import Circle from "@/atoms/icons/Circle";
import Cruz from "@/atoms/icons/Cruz";
import React from "react";

export default function IconsT() {
  return (
    <section className="dashboard__section">
      <Cruz width={30} />
      <i className="dashboard__i">
        <Circle width={35} />
      </i>
    </section>
  );
}
