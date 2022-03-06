import React from "react";
import style from "./Button.module.css";

export const Button = ({ caption }) => {
  return (
    <button className={style.button} type="submit">
      {caption}
    </button>
  );
};
