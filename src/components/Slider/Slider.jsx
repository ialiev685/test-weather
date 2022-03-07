import React, { useState } from "react";
//style
import style from "./Slider.module.css";
//component
import { ArrowSlider } from "../ArrowSlider";

export const Slider = ({ data }) => {
  const [offSet, setOffset] = useState(0);

  return (
    <div className={style.slider}>
      <ArrowSlider />
      <div className={style.slider__window}>
        <div className={style.slider__container}>
          <div className={style.slider__item}>item 1</div>
          <div className={style.slider__item}>item 2</div>
          <div className={style.slider__item}>item 3</div>
        </div>
      </div>
      <ArrowSlider orientation={"right"} />
    </div>
  );
};
