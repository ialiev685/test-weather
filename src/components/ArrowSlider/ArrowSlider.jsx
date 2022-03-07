import React from "react";
//style
import style from "./ArrowSlider.module.css";
//components
import { ReactComponent as ArrowIcon } from "./arrow-icons.svg";
const cn = require("classnames");

export const ArrowSlider = ({ orientation = "", onClick }) => {
  return (
    <button type="button" className={style.arrow} onClick={onClick}>
      <ArrowIcon
        className={cn(style.arrow__icom, orientation && style.arrow__right)}
      />
    </button>
  );
};
