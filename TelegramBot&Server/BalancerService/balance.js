const express = require("express");
const app = express();
const port = 4343;
const bodyParser = require("body-parser");
const weatherApi = require("./weatherApi");
const fetch = require("node-fetch");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = `http://localhost:4242/bot`;
const hpath = `${path}H`

app.get("/", (req, res) => {
  res.send("Health check with weather!");
});

app.get("/weather/forecast/6h", (req, res) => {
  weatherApi
    .fetchForecastSixHours(req.query.city)
    .then((data) => {
      fetch(hpath, {//Отправка тела с 6 часовым срезом
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json(data);
    })
    .catch((error) => {
      console.error(`We found: ${error}`);
    });
});

app.get("/weather/current", (req, res) => {

  weatherApi.fetchForecastCurrent(req.query.city)
  .then((data) => {
    fetch(path, {//Отправка тела с данными о текущем
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json(data);
  })
  .catch((error) => {
    console.error(`We found: ${error}`);
  });
});

app.listen(port, () => {
  console.log(`Weather app listening at http://localhost:${port}`);
});
