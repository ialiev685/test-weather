import React, { useEffect, useState } from "react";
//api
import { API } from "../services";
//component
import { Slider } from "../components/Slider";

const cityesId = ["2643743", "524894", "1816670", "5128638", "2988506"];

export const Home = () => {
  const [data, setData] = useState([]);

  const fetchWeatherDefault = async (countFetch) => {
    const result = await API.fetchWeatherDefault(cityesId[countFetch]);
    console.log(result);
    setData((prevState) => [...prevState, result.data]);
    ///////
  };

  useEffect(() => {
    let countFetch = 0;
    const intervalFetch = setInterval(() => {
      // fetchWeatherDefault(countFetch);
      countFetch += 1;
      if (countFetch === 5) clearInterval(intervalFetch);
    }, 1000);
  }, []);

  return (
    <div>
      <p>Welcome</p>
      <Slider />
    </div>
  );
};
