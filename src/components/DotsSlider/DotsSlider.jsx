import React from "react";
//style
import style from "./DotsSlider.module.css";

export const DotsSlider = ({ count }) => {
  return (
    <div className={style.dots}>
      <ul className={style.dots__list}>
        {[...Array(count)].map((_, index) => {
          return <li key={index} className={style.dots__item}></li>;
        })}
      </ul>
    </div>
  );
};
