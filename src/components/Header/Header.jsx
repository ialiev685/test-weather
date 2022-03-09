import React, { useContext } from "react";
//provider

import { AuthContext } from "../../provider";
//style
import style from "./Header.module.css";
//component
import { Container } from "../../components/Container";

export const Header = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className={style.header}>
      <Container>
        <div className={style.header__wrapper}>
          <span>{`Hi, ${user.login}!`}</span>
          <button
            className={style.header__button}
            type="button"
            onClick={() => signOut()}
          >
            Exit
          </button>
        </div>
      </Container>
    </div>
  );
};
