import React, { useState, useRef, useEffect } from "react";
//style
import style from "./Slider.module.css";
//component
import { ArrowSlider } from "../ArrowSlider";
import { DotsSlider } from "../DotsSlider";
import { ItemSlider } from "../ItemSlider";

export const Slider = ({ data }) => {
  const [offSet, setOffset] = useState(0);
  const [widthSlide, setWidthSlide] = useState(0);

  const ref = useRef();

  const handleNextLeft = () => {
    setOffset((prevState) => {
      const newOffset = prevState + widthSlide;
      const maxOffset = 0;
      return Math.min(newOffset, maxOffset);
    });
  };

  const handleNextRight = () => {
    setOffset((prevState) => {
      const newOffset = prevState - widthSlide;
      const maxOffset = -(widthSlide * (data.length - 1));

      return Math.max(newOffset, maxOffset);
    });
  };

  const handleClickDot = (index) => {
    const newOffset = -index * widthSlide;

    setOffset(newOffset);
  };

  const handleResizeWindow = (e) => {
    const widthCur = e.target.outerWidth;
    let widthEl;
    if (widthCur >= 768) {
      widthEl = ref.current?.children[0].clientWidth;
      setWidthSlide(widthEl);
      setOffset(0);
    }
    if (widthCur < 768) {
      widthEl = ref.current?.children[0].clientWidth;
      setWidthSlide(widthEl);
      setOffset(0);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    const width = ref.current?.children[0].clientWidth;
    setWidthSlide(width);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

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
