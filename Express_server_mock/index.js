const express = require("express");
const app = express();
const fs = require("fs");
const port = 7070;
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/json" }));

const DATA_FILE_PATH = "api_v2/data/status-check/get.json";
const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
let dataParsed = JSON.parse(data);

let resetValue = {...dataParsed}
let count = 0; //количество загрузок данных
let valuesTotalLength = 0; //длинна всех массивов вместе, которые были переданы
let uniqueValues = []; // массив уникальных значений из всех массивов, которые были переданы
let ArithmeticMean = 0; //среднее арифметическое значений из всех массивов, которые были переданы

let arrayForUnique = [];
let arrayForAverage = [];
let myPassword = "myPassword";

const MOCK_API_PATH = __dirname + "/api_v2/data/get/";

app.post("/data/update", (req, res) => {
 return postWork (req, res)
});

app.get("/data/status-check", (req, res) => {
  res.send(`структура со следующей информацией:${JSON.stringify(dataParsed)}`);
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(resetValue, null, "\t")); //чтоб не перезаписывало исходник JSON
});

app.get("/data/get", (req, res) => {
  res.send(objFromDecrText());
});

app.use((req, res, next) => {
  res.status(404).type("text/plain");
  res.send("Not found");
  next();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function postWork (req, res){
  if (Object.keys(req.body).length == 0) {//можно и проверки сделать, если число и бла,бла. Но условия задачи другие
    console.log('Отправили пустой объект');
}
  else {
  let date = new Date();
  const dateFileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;

  const fileName = `${MOCK_API_PATH}${dateFileName}.txt`;

  let queryInput = Object.values(req.body)[0];//По условию  body -> { values: [1, 2, 3....] } внутри массива только числа
  
  arrayForUnique.push(...new Set(queryInput));
  uniqueValues = [...new Set([...arrayForUnique, ...queryInput])]; //массив уникальных значений из всех массивов, которые были переданы

  arrayForAverage.push(...queryInput);
  ArithmeticMean = average(arrayForAverage); //среднее арифметическое значений из всех массивов, которые были переданы

  let myvalue = new ObjectToData(
    count += 1, //количество загрузок данных
    valuesTotalLength += queryInput.length,//длинна всех массивов вместе, которые были переданы
    ArithmeticMean,
    uniqueValues
  );

  Object.assign(dataParsed, myvalue);
  

  let myString = `{"${dateFileName}": ${JSON.stringify(req.body)}}`;//текст для шифрования, чтоб можно было распарсить

  let encrypted = CryptoJS.AES.encrypt(myString, myPassword);//шифруем

  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(dataParsed, null, "\t"));

  fs.writeFile(fileName, encrypted, function (err) {
    //Каждый POST запрос должен создавать файл txt где будет хранится тело запроса в шифрованном AES виде
    if (err) throw err;
    console.log("File is created successfully.");
  });
}
  res.send();
}

function average(nums) {//среднее арифметическое
  return nums.reduce((a, b) => a + b) / nums.length;
}

function ObjectToData(count, valuesTotalLength, uniqueValues, ArithmeticMean) {//для сбора данных
  this.count = count;
  this.valuesTotalLength = valuesTotalLength;
  this.ArithmeticMean = ArithmeticMean;
  this.uniqueValues = uniqueValues;
}

var getFiles = function (dir, files_) {//получить путь файлов в папке, для дешифрования

  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
};

function objFromDecrText() {//Объект из зашифрованного текста

  let stringDecrypted = {};
  getFiles(`${MOCK_API_PATH}`).forEach(function (item) {
    let arrData = fs.readFileSync(`${item}`, "utf8");
    let decrypted = CryptoJS.AES.decrypt(arrData, myPassword).toString(
      CryptoJS.enc.Utf8
    );
    stringDecrypted = Object.assign(stringDecrypted, JSON.parse(decrypted));
  });
  return stringDecrypted;
}
