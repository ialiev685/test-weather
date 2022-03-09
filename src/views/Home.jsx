import React, { useEffect, useState, useCallback, useContext } from "react";
//api
import { API } from "../services";
//component
import { Slider } from "../components/Slider";
import { SearchControl } from "../components/InputControl";
//route
import { useNavigate } from "react-router-dom";
//provider
import { AuthContext } from "../provider";
//style
import style from "./Home.module.css";
const debounce = require("lodash.debounce");

export const Home = () => {
  const [data, setData] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [query, setQuery] = useState("");

  const { user } = useContext(AuthContext);

  const navigation = useNavigate();

  const fetchWeatherDefault = async (citiesId) => {
    try {
      setIsLoad(true);
      const resultData = await API.fetchWeatherDefault(citiesId);
      console.log("default", resultData);

      setData((prevState) => [...prevState, ...resultData]);
      setIsLoad(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAddCity = useCallback(
    debounce(async (name) => {
      try {
        if (name.trim() === "") return;
        const result = await API.fetchAddCity(name);

        setData((prevState) => [...prevState, { data: { ...result } }]);
        if (result) navigation("detalis", { state: { data: result } });
      } catch (error) {
        console.log("catch", error.message);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (data.length !== 0) return;
    const { citiesId } = user;
    fetchWeatherDefault(citiesId);
  }, [data.length, user]);

  useEffect(() => {
    fetchAddCity(query);
  }, [fetchAddCity, query]);

  return (
    <div className={style.homePage}>
      {isLoad ? (
        <p className={style.homePage__text}>...loading</p>
      ) : (
        <Slider data={data} />
      )}

      <SearchControl value={query} onChange={setQuery} />
    </div>
  );
};
