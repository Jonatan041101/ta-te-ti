"use client";
import React from "react";
import IconsT from "./IconsT";
import Button from "@/atoms/Button";
import Modal from "./Modal";
import Circle from "@/atoms/icons/Circle";
import Cruz from "@/atoms/icons/Cruz";
import { XO, useBearStore } from "@/store/store";
interface SelectCircleCruz {
  id: number;
  icon: JSX.Element;
  cruzOrCircle: XO;
}
export default function SelectGame() {
  const { turn, changeTurn, playToGame, selectIcon } = useBearStore(
    (state) => state
  );
  const IconsMap: SelectCircleCruz[] = [
    {
      id: 101,
      icon: <Cruz width={30} />,
      cruzOrCircle: "X",
    },
    {
      id: 100,
      icon: <Circle width={32} />,
      cruzOrCircle: "O",
    },
  ];
  const changeElement = (element: XO) => {
    selectIcon(element);
  };
  return (
    <Modal>
      <div className="select">
        <IconsT />
        <section className="select__section">
          <h2 className="select__h2">Selecciona Cruz o Circulo</h2>
          <div className="select__circle">
            {IconsMap.map((value) => (
              <div
                className="select__icon"
                data-back={turn === value.cruzOrCircle}
                key={value.id}
                onClick={() => changeElement(value.cruzOrCircle)}
              >
                {value.icon}
              </div>
            ))}
          </div>
          <p className="select__p">Recomendamos empezar con X</p>
        </section>
        <div className="select__buttons">
          <Button
            text="Nuevo Juego (VS CPU)"
            color="#f2b237"
            value=""
            shadow="#cc8b13"
            handleClick={() => playToGame(true)}
          />
          <Button
            text="Nuevo Juego (VS Jugador)"
            color="#31c3be"
            value=""
            shadow="#1e8786"
            handleClick={() => playToGame(false)}
          />
        </div>
      </div>
    </Modal>
  );
}
