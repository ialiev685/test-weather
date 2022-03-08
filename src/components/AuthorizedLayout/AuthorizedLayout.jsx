import React from "react";
//style
import style from "./AuthorizedLayout.module.css";
//component
import { Header } from "../Header";
import { Container } from "../../components/Container";

export const AuthorizedLayout = ({ children }) => {
  return (
    <div className={style.box}>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};
