const axios = require("axios");

const API_KEY_WEATHER = "ddda4a774ac608c453fa2f802decf1f9";
const API_KEY_IMAGE = "22163812-fdf68a623e9a64649f570bea3";

const BASE_URL_WEATHER = "http://api.openweathermap.org/data/2.5/weather";
const BASE_URL_IMAGE = "https://pixabay.com/api/";

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

export const fetchPhotoCity = async () => {
  const result = await axios.get(
    `${BASE_URL_IMAGE}?key=${API_KEY_IMAGE}&q=london&page=1&per_page=3`
  );

  return result;
};
