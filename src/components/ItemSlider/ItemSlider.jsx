import React from "react";
//style
import style from "./ItemSlider.module.css";

export const ItemSlider = ({ data }) => {
  return data.map((item, index) => {
    const { main, name, weather, image } = item.data;
    return (
      <div
        key={index}
        className={style.itemSlider}
        style={{
          backgroundImage: `linear-gradient(
            to right,
            var(--color-black-transparent),
            var(--color-black-transparent)
          ), url(${image})`,
        }}
      >
        <h2 className={style.itemSlider__title}>{name}</h2>
        <p>temperature: {Math.round(main.temp)} °C</p>
        <p>weather: {weather[0].description}</p>
      </div>
    );
  });
};
