import React, { useContext, useState, useEffect } from "react";
//defaultImage
import defaultImage from "../../images/no-image-large.jpg";
//style
import style from "./ItemDetalis.module.css";
//icons
import { ReactComponent as FavouritesIcon } from "./star.svg";
import { ReactComponent as DeleteIcon } from "./trash.svg";
//provider
import { AuthContext } from "../../provider";
//route
import { useNavigate } from "react-router-dom";

export const ItemDetalis = ({ data }) => {
  const [isFavourites, setIsFavourites] = useState(false);
  const [curIndexItem, setCurIndexItem] = useState(null);

  const { user, deleteCity, addCity, currentUser } = useContext(AuthContext);

  const navigation = useNavigate();

  const handleDeleteItemFromFavour = () => {
    const result = deleteCity(curIndexItem);
    if (result === 200) {
      currentUser();
      navigation("/");
    }
  };

  const handleAddItemToFovour = (id) => {
    const result = addCity(id);
    if (result === 200) {
      setIsFavourites(true);
      currentUser();
    }
  };

  useEffect(() => {
    user.citiesId.forEach((item, index) => {
      if (Number(item) === data.id) {
        setIsFavourites(true);
        setCurIndexItem(index);
      }
    });
  }, [data.id, user.citiesId]);

  return (
    <div
      className={style.itemDetalis}
      style={{
        backgroundImage: `linear-gradient(
            to right,
            var(--color-black-transparent),
            var(--color-black-transparent)
          ), url(${data.largeImage ? data.largeImage : defaultImage})`,
      }}
    >
      <h2 className={style.itemDetalis__title}>{data.name}</h2>

      <table className={style.itemDetalis__table}>
        <thead>
          <tr>
            <th>propery</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>temperature:</td>
            <td>{Math.round(data.main.temp)} °C</td>
          </tr>
          <tr>
            <td>feels like:</td>
            <td>{Math.round(data.main.feels_like)} °C</td>
          </tr>
          <tr>
            <td>humidity:</td>
            <td>{data.main.humidity} %</td>
          </tr>
          <tr>
            <td>pressure:</td>
            <td>{data.main.pressure} m.p.</td>
          </tr>
          <tr>
            <td>min temperature:</td>
            <td>{Math.round(data.main.temp_min)} °C</td>
          </tr>
          <tr>
            <td>max temperature:</td>
            <td>{Math.round(data.main.temp_max)} °C</td>
          </tr>
          <tr>
            <td>weather:</td>
            <td>{data.weather[0].description}</td>
          </tr>
          <tr>
            <td>wind speed:</td>
            <td>{data.wind.speed} m/s</td>
          </tr>
        </tbody>
      </table>
      <div className={style.itemDetalis__control}>
        <FavouritesIcon
          width={30}
          height={20}
          style={{
            fill: isFavourites ? "var(--color-yellow)" : "var(--color-white)",
            marginRight: "10px",
          }}
          onClick={() => {
            if (!isFavourites) handleAddItemToFovour(data.id);
          }}
        />
        <DeleteIcon
          width={30}
          height={20}
          style={{ fill: "var(--color-white)" }}
          onClick={() => {
            if (isFavourites) handleDeleteItemFromFavour();
          }}
        />
      </div>
    </div>
  );
};
