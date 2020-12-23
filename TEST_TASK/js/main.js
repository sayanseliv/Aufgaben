const inputs = document.querySelectorAll(".qty__item");
const p = document.querySelectorAll("p");
const button = document.querySelectorAll(".product-box__btn");
const XXX = document.querySelectorAll(".red-info");
const box = document.querySelector(".top-header");
const strXXX = "XXX";

const select = document.querySelectorAll(".select-control");
const selectCategory = select[0];
const selectPrice = select[1];
const items = document.querySelectorAll(".product-box__item");

const order = document.querySelector(".btn-check");

selectCategory.addEventListener("change", function (event) {
  items.forEach((element) => {
    if (Number(this.value) === 0) {
      selectPrice.value = 0;
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
      selectCategory.value = 0;
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
      if (XXX[1].innerText === strXXX && XXX[0].innerText === strXXX) {
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

order.addEventListener("click", function (event) {
  if (XXX[1].innerText === strXXX && XXX[0].innerText === strXXX) {
    alert(`Ничего не выбрано, пожалуйста выберите сначала блюдо`);
  } else {
    order.disabled = true;
    box.insertAdjacentHTML("beforeBegin", modalStructure());
    let modal = document.getElementById("modal");
    modal.style = modalStyle();
    let content = document.querySelector(".modal-content");
    content.style = contentStyle();
    let close = document.querySelector(".close");
    close.style = closeStyle();
    let wrapper = document.querySelector(".inputs-wrapper");
    wrapper.style = wrapperStyle();
    close.addEventListener("click", function (event) {
      modal.style.display = modal.style.display.replace("flex", "none");
    });
    let form = document.querySelector(".formWithValidation");
    let name = form.querySelector(".name_input");
    let email = form.querySelector(".email_input");
    let fields = form.querySelectorAll(".field");

    form.addEventListener("submit", function (event) {
      for (let i = 0; i < fields.length; i++) {
        if (!fields[i]) {
          event.preventDefault();
          alert("Поля не заполнены");
        }
      }

      if (!validateName(name.value)) {
        event.preventDefault();
        alert(`Имя ${name.value} введено не корректно`);
      } else if (!validateEmail(email.value)) {
        event.preventDefault();
        alert(`Email ${email.value} введен не корректно`);
      } else if (validateEmail(email.value) && validateName(name.value)) {
        event.stopPropagation();
        alert(
          `Спасибо за покупку в количестве ${XXX[0].innerText} штук на сумму ${XXX[1].innerText} грн.`
        );
        (XXX[0].innerText = strXXX), (XXX[1].innerText = strXXX);
      }
      console.log("clicked on validate");
      console.log("name_input: ", name.value);
      console.log("email_input: ", email.value);
      order.disabled = false;
    });
  }
});

function numFromText(el) {
  return parseInt(el.match(/\d+/));
}

function multiply(a, b) {
  return a * b;
}

function validateName(str) {
  let nameRegex = /^([А-Я]{1}[а-яё]{1,}|[A-Z]{1}[a-z]{1,})$/; //Имя с Заглавной буквы англ/рус
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
<label for='email_input'>Имя: </label>
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
