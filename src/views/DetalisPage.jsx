import React from "react";
//style
import style from "./DetalisPage.module.css";
//route
import { useLocation, Link } from "react-router-dom";
//component
import { ItemDetalis } from "../components/ItemDetalis";

export const DetalisPage = () => {
  const location = useLocation();

  console.log(location);

  const { data } = location.state;

  return (
    <div className={style.detalisPage}>
      <Link className={style.detalisPage__link} to="/">
        go back
      </Link>

      {data ? <ItemDetalis data={data} /> : "Not found"}
    </div>
  );
};
