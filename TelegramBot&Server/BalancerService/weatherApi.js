const fetch = require("node-fetch");

const API_KEY = "My API Key";
const WEATHER_PATH_BASE = "https://api.openweathermap.org/data/2.5";

class WeatherApi {
  fetchForecastCurrent(city = "") {
    return fetch(`${WEATHER_PATH_BASE}/weather?q=${city}&appid=${API_KEY}`)
      .then((resp) => resp.json())
      .catch((error) => {
        console.error(`We found: ${error}`);
      });
  }

  fetchForecastSixHours(city = "") {
    return fetch(
      `${WEATHER_PATH_BASE}/forecast?q=${city}&cnt=3&appid=${API_KEY}&units=metric`
    ) //cnt=3 делает 3 среза: сейчас, 3 часа, 6 часов
      .then((resp) => resp.json())
      .catch((error) => {
        console.error(`We found: ${error}`);
      });
  }
}

module.exports = new WeatherApi();
