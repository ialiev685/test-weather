import React, { useEffect, useState } from "react";
//api
import { API } from "../services";
//component
import { Slider } from "../components/Slider";
//style
import style from "./Home.module.css";

// const cityesId = ["2643743", "524894", "1816670", "5128638", "2988506"];

export const Home = () => {
  const [data, setData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const fetchWeatherDefault = async () => {
    setIsLoad(true);
    const resultData = await API.fetchWeatherDefault();
    console.log(resultData);

    setData((prevState) => [...prevState, ...resultData]);
    setIsLoad(false);
  };

  useEffect(() => {
    fetchWeatherDefault();
  }, []);

  return (
    <div className={style.homePage}>
      {isLoad ? "...loading" : <Slider data={data} />}
    </div>
  );
};
