"use strict";
// Написать функцию map, которая будет принимать в качестве
// аргумента массив arr и функцию, которая в свою очередь будет
// осуществлять преобразование массива arr  в вид
// [ "<li class="list-group-item">Tom</li>", ....]
// и выводить элементы массива в ul с id="list"
// Вывод должен осуществляться в отсортированном по алфавиту виде

//Цель - выяснить понимание областей видимости.

let arr = ["Tom", "Steve", "Bill", "Rita", "Pete", "Ashley"];
const list = document.getElementById("list");

// Сигнатура map
function map(list, fn) {
  fn(list);
}
map(arr, template);

function template(arr) {
  if (!arr) return;
  const temp = [];
  arr
    .sort(function (a, b) {
      return a.localeCompare(b);
    })
    .forEach((el) => {
      temp.push(`<li class="list-group-item">${el}</li>`);
    });
  list.innerHTML = temp.join(" ");
}
