const axios = require("axios");

const API_KEY_WEATHER = "ddda4a774ac608c453fa2f802decf1f9";
const API_KEY_IMAGE = "22163812-fdf68a623e9a64649f570bea3";

const BASE_URL_WEATHER = "http://api.openweathermap.org/data/2.5/weather";
const BASE_URL_IMAGE = "https://pixabay.com/api/";
const BASE_URL_WEATHER_FIND = "https://api.openweathermap.org/data/2.5/find";

//api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}

let arrayDataDefault = [];

const fetchData = async (cityid) => {
  const resultCity = await axios.get(
    `${BASE_URL_WEATHER}?id=${cityid}&units=metric&appid=${API_KEY_WEATHER}`
  );
  if (!resultCity?.data?.name) throw new Error("Not found");
  const { name } = resultCity.data;
  const resultImage = await axios.get(
    `${BASE_URL_IMAGE}?key=${API_KEY_IMAGE}&q=${name}&page=1&per_page=3`
  );
  if (!resultImage.data.hits[0]) {
    resultCity.data.image = null;
    resultCity.data.largeImage = null;
  } else {
    resultCity.data.image = resultImage.data.hits[0].webformatURL;
    resultCity.data.largeImage = resultImage.data.hits[0].largeImageURL;
  }
  arrayDataDefault.push(resultCity);
  return resultCity;
};

export const fetchWeatherDefault = (citiesId) => {
  return new Promise((resolve, reject) => {
    let countFetch = 0;

    arrayDataDefault = [];

    let cityid = "";

    const intervalFetch = setInterval(async () => {
      cityid = citiesId[countFetch];
      const result = await fetchData(cityid);

      if (!result?.data) {
        clearInterval(intervalFetch);

        reject(new Error("Not found"));
      }
      countFetch += 1;
      if (countFetch === citiesId.length) {
        clearInterval(intervalFetch);

        resolve(arrayDataDefault);
      }
    }, 500);
  });
};

export const fetchAddCity = async (name) => {
  const resultCity = await axios.get(
    `${BASE_URL_WEATHER_FIND}?q=${name}&units=metric&appid=${API_KEY_WEATHER}`
  );

  if (!resultCity?.data?.list[0]) throw new Error("Not found");

  const { name: value } = resultCity.data.list[0];

  const resultImage = await axios.get(
    `${BASE_URL_IMAGE}?key=${API_KEY_IMAGE}&q=${value}&page=1&per_page=3`
  );

  if (!resultImage.data.hits[0]) {
    resultCity.data.list[0].image = null;
    resultCity.data.list[0].largeImage = null;
  } else {
    resultCity.data.list[0].image = resultImage.data.hits[0].webformatURL;
    resultCity.data.list[0].largeImage = resultImage.data.hits[0].largeImageURL;
  }

  return resultCity.data.list[0];
};
