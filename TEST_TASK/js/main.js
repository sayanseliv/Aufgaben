const inputs = document.querySelectorAll(".qty__item");
const button = document.querySelectorAll(".product-box__btn");
const XXX = document.querySelectorAll(".red-info");
const strXXX = "XXX";

const items = document.querySelectorAll(".product-box__item");

const order = document.querySelector(".btn-check");
//Filtration by category
document
  .querySelector(".select-box .select-control")
  .addEventListener("change", function (event) {
    items.forEach((element) => {
      if (this.value === "0") {
        element.classList.remove("hideCategory");
      } else {
        element.classList.add("hideCategory");
        if (element.classList.contains(`${this.value}`)) {
          element.classList.remove("hideCategory");
        }
      }
    });
  });
//Filtration by price
document
  .querySelector(".price-select-box .select-control")
  .addEventListener("change", function (event) {
    items.forEach((element) => {
      if (this.value === "0") {
        element.classList.remove("hidePrice");
      } else {
        element.classList.add("hidePrice");
        if (
          Number(this.value) >=
          numFromText(element.children[2].children[0].innerHTML)
        ) {
          element.classList.remove("hidePrice");
        }
      }
    });
  });

giveID(document.querySelectorAll("p"), "p");
giveID(inputs, "inputs");
giveID(button, "p");

button.forEach.call(button, function (el) {
  //вешаем событие
  var prevArray = new Array(button.length).fill(0);
  el.onclick = function (e) {
    if (XXX[0].innerText === strXXX) {
      XXX[0].innerText = 0;
      XXX[1].innerText = 0;
    }

    let ID = numFromText(el.id);
    let prev = prevArray[ID];
    let inputNumber = numFromText(
      document.getElementById(`inputs_${ID}`).value
    );
    let price = numFromText(document.getElementById(`p_${ID}`).innerText);

    if (inputNumber >= 0 && inputNumber !== prev) {
      let differenceValue = inputNumber - prev;
      let amountCurrent = Number(XXX[0].innerText);
      XXX[0].innerText = amountCurrent + differenceValue;
      prevArray[ID] = inputNumber;

      let priceCurrent = Number(XXX[1].innerText);
      let resPrice = price * differenceValue;
      XXX[1].innerText = priceCurrent + resPrice;
    }
  };
});

order.addEventListener("click", function (event) {
  if (XXX[1].innerText === strXXX && XXX[0].innerText === strXXX) {
    alert(`Ничего не выбрано, пожалуйста выберите сначала блюдо`);
  } else {
    order.disabled = true;
    document
      .querySelector(".top-header")
      .insertAdjacentHTML("beforeBegin", modalStructure());
    let modal = document.getElementById("modal");
    modal.style = modalStyle();
    document.querySelector(".modal-content").style = contentStyle();
    let close = document.querySelector(".close");
    close.style = closeStyle();
    document.querySelector(".inputs-wrapper").style = wrapperStyle();
    close.addEventListener("click", function (event) {
      document.querySelector(".formWithValidation").remove();
      order.disabled = false;
    });
    let form = document.querySelector(".formWithValidation");
    let name = form.querySelector(".name_input");
    let email = form.querySelector(".email_input");
    let fields = form.querySelectorAll(".field");
    form.addEventListener("submit", function (event) {
      let newStr = name.value[0].toUpperCase() + name.value.slice(1);
      for (let i = 0; i < fields.length; i++) {
        if (!fields[i]) {
          event.preventDefault();
          alert("Поля не заполнены");
        }
      }

      if (!validateName(newStr)) {
        event.preventDefault();
        alert(
          `Имя ${name.value} введено не корректно. Имя может содержать только буквы и дефис`
        );
      } else if (!validateEmail(email.value)) {
        event.preventDefault();
        alert(`Email ${email.value} введен не корректно`);
      } else if (validateEmail(email.value) && validateName(newStr)) {
        alert(
          `Спасибо за покупку в количестве ${XXX[0].innerText} штук на сумму ${XXX[1].innerText} грн.`
        );
        event.stopPropagation();
        (XXX[0].innerText = strXXX), (XXX[1].innerText = strXXX);
      }
      order.disabled = false;
    });
  }
});

function giveID(tag, txt) {
  tag.forEach((el, index) => (el.id = `${txt}_${index}`));
}

function numFromText(el) {
  return parseInt(el.match(/\d+/));
}

function multiply(a, b) {
  return a * b;
}

function validateName(str) {
  let nameRegex = /^([А-Я]{1}[а-яё-]{1,}|[A-Z]{1}[a-z-]{1,})$/; //Имя с Заглавной буквы англ/рус
  return nameRegex.test(str);
}

function validateEmail(str) {
  let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  return emailRegex.test(str);
}

function modalStructure() {
  return `<form class='formWithValidation'>
  <div id="modal">
<div class="modal-content">
<span class="close">&times;</span><Br>
<div class="inputs-wrapper">
<label for='name_input'>Имя: </label>
<input type="text" class="name_input field" name="name" required placeholder="Имя"><Br>
<label for='email_input'>Email: </label>
<input type="email" class="email_input field" name="email" required placeholder="example@gmail.com"><Br><Br>
<input type="submit" class="validateBtn" value='Submit'>
</div>
</div>
</div>
</form>`;
}

function modalStyle() {
  return `
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  position: fixed;
  top: 25%;
  left: 25%;
  z-index: 1;
  background-color: rgba(0,0,0,0.8)`;
}

function contentStyle() {
  return `
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 75%;
  width: 75%;
  background-color: #fefefe;
  border: 1px solid #888;`;
}

function closeStyle() {
  return `
  position: relative;
  left: 25%;
  font-size: 28px;
  font-weight: bold;`;
}

function wrapperStyle() {
  return `text-align: left;`;
}

inputs.forEach((element) => {
  //ограничить диапазон инпут
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
