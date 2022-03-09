import React from "react";
//style
import style from "./ItemSlider.module.css";
//route
import { useNavigate } from "react-router-dom";
//defaultImage
import defaultImage from "../../images/no-image.jpg";

export const ItemSlider = ({ data }) => {
  const navigate = useNavigate();

  const handleOpenDetalis = (index) => {
    navigate("/detalis", { state: { data: data[index].data } });
  };

  return data.map((item, index) => {
    const { main, name, weather, image } = item.data;

    return (
      <div
        onClick={() => handleOpenDetalis(index)}
        key={index}
        className={style.itemSlider}
        style={{
          backgroundImage: `linear-gradient(
              to right,
              var(--color-black-transparent),
              var(--color-black-transparent)
            ), url(${image ? image : defaultImage})`,
        }}
      >
        <h2 className={style.itemSlider__title}>{name}</h2>
        <p>temperature: {Math.round(main.temp)} °C</p>
        <p>weather: {weather[0].description}</p>
      </div>
    );
  });
};
