import React, { useEffect, useState } from "react";
//api
import { API } from "../services";
//component
import { Slider } from "../components/Slider";

// const cityesId = ["2643743", "524894", "1816670", "5128638", "2988506"];

export const Home = () => {
  const [data, setData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  const fetchWeatherDefault = async () => {
    setIsLoad(true);
    const result = await API.fetchWeatherDefault();
    console.log(result);
    setData((prevState) => [...prevState, ...result]);
    setIsLoad(false);
  };

  useEffect(() => {
    fetchWeatherDefault();
    /////////
  }, []);

  return <div> {isLoad ? "...loading" : <Slider data={data} />}</div>;
};
