import React from "react";
import style from "./GuestLayOut.module.css";

export const GuestLayout = ({ children }) => {
  return <section className={style.section}>{children}</section>;
};
