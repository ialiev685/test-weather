import React from "react";
//style
import style from "./GuestLayOut.module.css";
//components
import { Container } from "../../components/Container";

export const GuestLayout = ({ children }) => {
  return (
    <section className={style.section}>
      <Container>{children}</Container>
    </section>
  );
};
