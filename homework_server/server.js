var http = require('http');
var static = require('node-static');
const url = require('url');
const fs = require('fs');



const PERSON_FILE_PATH = './api/person.json';
const person = fs.readFileSync(PERSON_FILE_PATH, 'utf8');
let personParsed = JSON.parse(person);


// const address = {city:'', street:'', postCode:''};
// const post = {name:'', surname:''};
// const recipient = {...post,...address};
const address = ['city', 'street', 'postCode'];
const post = ['name', 'surname'];
const recipient = [...post,...address];


var file = new static.Server('.');
const port = 5622;

http.createServer(function(req, res) {
    
    const queryObject = url.parse(req.url,true);

    const queryArray = Object.keys(queryObject.query);
    
    if (queryObject.pathname === '/person' && queryObject.search === null && req.method == 'GET' ) {

        res.end(prettySTR(personParsed));//возвращает данные о человеке
    }

    if (queryObject.pathname === '/person/name' && queryObject.search === null && req.method == 'GET') {

        res.end(prettySTR(personParsed.name));//возвращает только имя человека
    }

    if(queryObject.pathname === '/person/address' && queryObject.search === null && req.method == 'GET') {//возвращает только те поля, который относятся к адресу.

        res.end(prettySTR(filter(personParsed, address )));
    }

    if(queryObject.pathname === '/person/post/recipient' && queryObject.search === null && req.method == 'GET') {//возвращает только те поля, который необходимы для сформирования почтового отправления - имя, фамилия, город, улица, почтовый индекс
   
        res.end(prettySTR(filter(personParsed, recipient)));
    }

    if(queryObject.pathname === '/person/update' && req.method == 'PUT') {

        updateUserCallback(req, res, queryObject)//PUT `/person/update`, с телом {...anything} - запрос который перезаписывает в файле `/api/person.json` всем что было передано в теле.
        fs.writeFileSync(PERSON_FILE_PATH, JSON.stringify(personParsed, null, '\t'))
        
        res.end(prettySTR(personParsed))
        }
    if (queryObject.pathname === '/person' && queryObject.search !== null && req.method == 'GET') {// возвращает !!!данные полей, которые переданные в строке. Может быть name, age, surname, height, weight, degree, city, street, postCode

        res.end(prettySTR(Object.values(matchObjAndStr(queryArray, personParsed))));
    }

    if(!!queryObject.pathname){

        res.end();
    };
    
  file.serve(req, res);
}).listen(port);

function stringToObject(str) {

    obj = str.split("&").reduce((ob, v) => ([a,b]=v.split("="),ob[a]=b,ob), {});
return obj;
}

function updateUserCallback(req, res, queryObject) {

    req.on('data', function(chunk) {
        // const obj = new URLSearchParams(chunk.toString());
      
        Object.assign(personParsed, stringToObject(chunk.toString()));
        });
}
  
function matchObjAndStr(str,obj){

if(!obj || !str) return
    var p = {};
    for(var key in obj){
     if(str.indexOf(key) !== -1){
         p[key] = obj[key];
      }
    }
    return p;
    }
   
function prettySTR(obj){

    let obj1 = JSON.stringify(obj).replace(/\b \b|["!@#$^&%*()+=[\]/{}|<>?.-]/g, '').replace(/[',']/g, "\r\n");
    return obj1
}

const filter = (obj, arr) => {
    if(!obj || !arr) return
    return arr.reduce((a, key) => (a[key] = obj[key], a), {});
    }
        
// const matchObject = (obj1, obj2) => {

    // if(!obj1 || !obj2) return
    // let result = {};
    // for (let prop in obj1) {
        // if (obj2.hasOwnProperty(prop)) result[prop] = obj1[prop];

    // };
    // return result;
// }


// function matchObj(obj, str){ // сравнение со строкой.Рабочая фишка
// 
    // if(!obj && str!== undefined && str!== null) return
// 
    // let objstr = {};
    // const regex = /^[\\&?]\w+|\b[\\&?]\w+/g;
    // let found = JSON.stringify(str.match(regex));
// 
// for(let key in obj){
// 
    // const regexp = new RegExp('\\b(?:' + key + ')\\b');
    // let result = found.match(regexp);
// 
// if(result!== -1 && result!==null && str.indexOf(key)!==-1){
    // objstr[key]=obj[key];
    // }
    // else key++;
// }
// return objstr
// }