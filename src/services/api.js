const axios = require("axios");

const API_KEY_WEATHER = "ddda4a774ac608c453fa2f802decf1f9";
const API_KEY_IMAGE = "22163812-fdf68a623e9a64649f570bea3";

const BASE_URL_WEATHER = "http://api.openweathermap.org/data/2.5/weather";
const BASE_URL_IMAGE = "https://pixabay.com/api/";
const BASE_URL_WEATHER_FIND = "https://api.openweathermap.org/data/2.5/find";

//api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}

const cityesName = ["London", "Moscow", "Beijing", "New York", "Paris"];
const cityesId = ["2643743", "524894", "1816670", "5128638", "2988506"];

let arrayDataDefault = [];

const fetchData = async (index) => {
  const result = await axios.get(
    `${BASE_URL_WEATHER}?id=${cityesId[index]}&units=metric&appid=${API_KEY_WEATHER}`
  );
  const resultImage = await axios.get(
    `${BASE_URL_IMAGE}?key=${API_KEY_IMAGE}&q=${cityesName[index]}&page=1&per_page=3`
  );
  result.data.image = resultImage.data.hits[0].webformatURL;
  result.data.largeImage = resultImage.data.hits[0].largeImageURL;

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
        clearInterval(intervalFetch);
        reject(result);
      }
      countFetch += 1;
      if (countFetch === 5) {
        clearInterval(intervalFetch);
        resolve(arrayDataDefault);
      }
    }, 700);
  });
};

export const fetchAddCity = async (name) => {
  const resultCity = await axios.get(
    `${BASE_URL_WEATHER_FIND}?q=${name}&units=metric&appid=${API_KEY_WEATHER}`
  );

  if (!resultCity?.data?.list[0]) throw Error("Not Found");

  const { name: value } = resultCity.data.list[0];

  const resultImage = await axios.get(
    `${BASE_URL_IMAGE}?key=${API_KEY_IMAGE}&q=${value}&page=1&per_page=3`
  );
  console.log(resultImage);
  if (!resultImage.data.hits[0]) {
    resultCity.data.list[0].image = null;
    resultCity.data.list[0].largeImage = null;
  } else {
    resultCity.data.list[0].image = resultImage.data.hits[0].webformatURL;
    resultCity.data.list[0].largeImage = resultImage.data.hits[0].largeImageURL;
  }

  return resultCity.data.list[0];
};
