process.env["NTBA_FIX_319"] = 1;
const port = process.env.PORT || 4242;
const token = "MY Token";
const fetch = require("node-fetch");

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(token, { polling: true });
const id = 922278281; //Код чата бота

// bot.setWebHook(`https://api.telegram.org/botMY Token`);  This informs the Telegram servers of the new webhook.
const app = express();
app.use(express.json()); // parse the updates to JSON

app.post(`/bot`, (req, res) => {//Обрабатываем тело с Отправка всей информации в текущий момент времени
  fetchForecast(req.body);
  res.send(req.body);
});

app.post(`/botH`, (req, res) => {//Обрабатываем тело с Отправка прогноза температуры на 6 часов вперед в телеграм бота
  fetchCurrent(req);
  res.send(req.body);
});

app.listen(port, () => {
  // Start Express Server
  console.log(`Express server is listening on http://localhost:${port}`);
});

//config Bot
let hi = "hi";
let bye = "bye";
bot.on("polling_error", (m) => console.log(m));

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    reply_markup: {
      keyboard: [[`${hi}`, "/start"], [`${bye}`], ["/sendpic"]],
    },
  });
});

bot.onText(/\/sendpic/, (msg) => {
  bot.sendPhoto(
    msg.chat.id,
    "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
  );
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    bot.sendMessage(chatId, "Hi  " + msg.from.first_name);
  } else if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(chatId, "Have a nice day " + msg.from.first_name);
  } else {
    bot.sendMessage(chatId, "<b>Поговорим, Друг?</b>", { parse_mode: "HTML" });
  }
});

function fetchCurrent(req) {

  let str = JSON.stringify(req.body.list[req.body.list.length - 1].main.temp, null, 2);
  //хард-код - спешил. Сделаны срезы - сейчас, через 3 часа и через 6. Поэтому последний массив это через 6 часов
  return fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=temperature:${str}`)
    .then((resp) => resp.json())
}

function fetchForecast(req) {

  let str = JSON.stringify(req, null, 2);
  return fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${str}`)
    .then((resp) => resp.json())
}
