import React, { useState, useRef, useEffect } from "react";
//style
import style from "./Slider.module.css";
//component
import { ArrowSlider } from "../ArrowSlider";
import { DotsSlider } from "../DotsSlider";
import { ItemSlider } from "../ItemSlider";

export const Slider = ({ data }) => {
  const [offSet, setOffset] = useState(0);

  const ref = useRef();

  const handleNextLeft = () => {
    setOffset((prevState) => {
      const newOffset = prevState + 250;
      const maxOffset = 0;
      return Math.min(newOffset, maxOffset);
    });
  };

  const handleNextRight = () => {
    setOffset((prevState) => {
      const newOffset = prevState - 250;
      const maxOffset = -(250 * (data.length - 1));

      return Math.max(newOffset, maxOffset);
    });
  };

  const handleClickDot = (index) => {
    const newOffset = -index * 250;

    setOffset(newOffset);
  };

  // console.log(ref.current?.children[0].clientWidth);
  ////

  return (
    <>
      <div className={style.slider}>
        <ArrowSlider onClick={handleNextLeft} />
        <div className={style.slider__window}>
          <div
            ref={ref}
            className={style.slider__container}
            style={{ transform: `translate(${offSet}px)` }}
          >
            {data.length !== 0 ? (
              <ItemSlider data={data} />
            ) : (
              <div className={style.slider__item}>Not found</div>
            )}
          </div>
        </div>
        <ArrowSlider orientation={"right"} onClick={handleNextRight} />
      </div>
      {data.length !== 0 ? (
        <DotsSlider onClick={handleClickDot} count={data.length} />
      ) : (
        ""
      )}
    </>
  );
};
