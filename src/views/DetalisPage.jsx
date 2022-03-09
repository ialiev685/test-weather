import React from "react";
//style
import style from "./DetalisPage.module.css";
//route
import { useLocation, Link } from "react-router-dom";

export const DetalisPage = () => {
  const location = useLocation();

  console.log(location);

  const { data } = location.state;

  return (
    <div className={style.detalisPage}>
      <Link className={style.detalisPage__link} to="/">
        go back
      </Link>

      {data ? (
        <div
          className={style.detalisPage__content}
          style={{
            backgroundImage: `linear-gradient(
            to right,
            var(--color-black-transparent),
            var(--color-black-transparent)
          ), url(${data.largeImage})`,
          }}
        >
          <h2 className={style.detalisPage__title}>{data.name}</h2>

          <table className={style.detalisPage__table}>
            <tr>
              <td>temperature:</td>
              <td>{data.main.temp}</td>
            </tr>
            <tr>
              <td>feels like:</td>
              <td>{data.main.feels_like}</td>
            </tr>
            <tr>
              <td>humidity:</td>
              <td>{data.main.humidity} %</td>
            </tr>
            <tr>
              <td>pressure:</td>
              <td>{data.main.pressure}</td>
            </tr>
            <tr>
              <td>min temperature:</td>
              <td>{data.main.temp_min}</td>
            </tr>
            <tr>
              <td>max temperature:</td>
              <td>{data.main.temp_max}</td>
            </tr>
            <tr>
              <td>weather:</td>
              <td>{data.weather[0].description}</td>
            </tr>
            <tr>
              <td>wind speed:</td>
              <td>{data.wind.speed}</td>
            </tr>
          </table>
        </div>
      ) : (
        "Not found"
      )}
    </div>
  );
};
