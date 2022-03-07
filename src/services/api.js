const axios = require("axios");

const API_KEY = "ddda4a774ac608c453fa2f802decf1f9";

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

//api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
//const cityesName = ["London", "Moscow", "Beijing", "New York", "Paris"];
const cityesId = ["2643743", "524894", "1816670", "5128638", "2988506"];

let arrayDataDefault = [];

const fetchData = async (index) => {
  const result = await axios.get(
    `${BASE_URL}?id=${cityesId[index]}&units=metric&appid=${API_KEY}`
  );
  arrayDataDefault.push(result);
  return result;
};

export const fetchWeatherDefault = () => {
  return new Promise((resolve, reject) => {
    let countFetch = 0;
    arrayDataDefault = [];
    const intervalFetch = setInterval(async () => {
      const result = await fetchData(countFetch);

      if (!result?.data) {
        console.log(result);
        clearInterval(intervalFetch);
        reject(result);
      }
      countFetch += 1;
      if (countFetch === 5) {
        clearInterval(intervalFetch);
        resolve(arrayDataDefault);
      }
    }, 500);
  });
};
