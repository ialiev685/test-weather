const axios = require("axios");

const API_KEY = "012e3474f0c52976ac00801418d24d3c";

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

// "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
const cityesName = ["London", "Moscow", "Beijing", "New York", "Paris"];
const cityesId = ["2643743", "524894", "1816670", "5128638", "2988506"];

export const fetchWeatherDefault = async (cityId) => {
  const result = await axios.get(
    `${BASE_URL}?id=${cityId}&units=metric&appid=${API_KEY}`
  );

  return result;
};
