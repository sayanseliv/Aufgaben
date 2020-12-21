const inputs = document.querySelectorAll(".qty__item");
const p = document.querySelectorAll("p");
const button = document.querySelectorAll(".product-box__btn");
const XXX = document.querySelectorAll(".red-info");

const select = document.querySelectorAll(".select-control");
const selectCategory = select[0];
const selectPrice = select[1];
const items = document.querySelectorAll(".product-box__item");

selectCategory.addEventListener("change", function (event) {
  items.forEach((element) => {
    if (this.value === "0") {
       selectPrice.value = 0
      element.style.display = "flex";
    } else if (
      element.classList.contains(this.value) &&
      element.classList.contains("choose") === true
    ) {
      element.classList.add("checked");
      element.style.display = "flex";
    } else if (!element.classList.contains(this.value)) {
      element.classList.remove("checked");
      element.style.display = "none";
    }
  });
});

selectPrice.addEventListener("change", function (event) {
  items.forEach((element) => {
    if (
      Number(this.value) === 0 &&
      element.classList.contains("checked") === false
    ) {
      selectCategory.value = 0
      element.style.display = "flex";
    } else if (
      Number(this.value) >=
        numFromText(element.children[2].children[0].innerHTML) &&
      element.classList.contains("checked") === true
    ) {
      element.classList.add("choose");
      element.style.display = "flex";
    } else if (
      Number(this.value) <
      numFromText(element.children[2].children[0].innerHTML)
    ) {
      element.style.display = "none";
      element.classList.remove("choose");
    }
  });
});

function giveID(tag, txt) {
  let start = 0;
  tag.forEach((el) => (el.id = `${txt}_${(start += 1)}`));
}

giveID(p, "p");
giveID(inputs, "inputs");
giveID(button, "p");

button.forEach.call(button, function (el) {
  //вешаем событие
  el.onclick = function (e) {
    let ID = numFromText(el.id);
    let inputNumber = numFromText(
      document.getElementById(`inputs_${ID}`).value
    );
    let price = numFromText(document.getElementById(`p_${ID}`).innerText);
    if (!inputNumber) {
      return;
    } else {
      if (XXX[1].innerText === "XXX" && XXX[0].innerText === "XXX") {
        XXX[0].innerText = inputNumber;
        XXX[1].innerText = multiply(price, inputNumber);
      } else {
        let numBasket = Number(XXX[0].innerText) + inputNumber;
        let numPrice = Number(XXX[1].innerText) + multiply(price, inputNumber);
        XXX[0].innerText = numBasket;
        XXX[1].innerText = numPrice;
      }
    }
  };
});

function numFromText(el) {
  return parseInt(el.match(/\d+/));
}
function multiply(a, b) {
  return a * b;
}

inputs.forEach((element) => {
  element.addEventListener("input", function (event) {
    if (isCorrect(event.target)) {
      event.preventDefault();
    }
  });
});

function isCorrect(obj) {
  if (obj.value > 50) obj.value = 50;
  if (obj.value < 0) obj.value = 0;
}
