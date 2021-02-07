// Реализовать контекстное (event = contextmenu) меню. Список хранить в памяти. // Почитать про event.preventDefault()
// Хранить в списке action - название функции которая будет выполнятся при нажатии на пункт меню.
// Создать actions: Jump, Remove, ChangeColor
// Меню должно всегда открыватся в окне, не создавая скрола.

let wallmoveX = 0;
let wallmoveY = 0;
let step = 5;
let from = 15;
let to = 200;
let CtrlBlock = true;
let JumpBlock = true;
let animation = true;
let flag = false;
let myVar = null;
let myVar1 = null;


const target = document.querySelector(".heroic");
const context = document.querySelector(".contextmenu-container");
let x = document.documentElement.clientWidth - target.offsetWidth;
let y = document.documentElement.clientHeight - target.offsetHeight;
let wWidth = window.innerWidth;
let hWidth = window.innerHeight;
const intro = document.querySelector(".intro");
const main = document.querySelector(".main-block");
const wall = document.querySelector(".wall");
const introButton = document.createElement("button");
target.style.animationPlayState = "paused";

const change = document.querySelector(".changeColor");
const bod = document.querySelector("body");

const list = [
  {
    title: "Jump",
    action: "jump",
  },
  {
    title: "Remove",
    action: "remove",
  },
  {
    title: "Reset",
    action: "reset",
  },
  {
    title: "ChangeColor",
    action: "changeColor",
  }
];

const listActions = {
  jump,
  remove,
  reset,
  changeColor,
};

introButton.className = "active";
introButton.innerText += "Нажми левой кнопкой, чтоб всё началось";
intro.append(introButton);

introButton.addEventListener("click", function () {
  intro.style.display = "none";
  main.style.visibility = "visible";
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft" && collision(target, wall)) {
    wallmoveX = 10;
    if (target.offsetLeft > step) {
      target.style.animationPlayState = "running";
      target.style.transform = "rotateY(180deg)";
      target.style.left = target.offsetLeft - step + "px";
    }
  }
  if (CtrlBlock && event.key === "ArrowUp" && collision(target, wall)) {
    wallmoveY = 10;
    if (target.offsetTop > step) {
      target.style.animationPlayState = "running";
      target.style.top = target.offsetTop - step + "px";
    }
  }
  if (event.key === "ArrowRight" && collision(target, wall)) {
    wallmoveX = -10;
    if (target.offsetLeft < x) {
      target.style.animationPlayState = "running";
      target.style.transform = "rotateY(0deg)";
      target.style.left = target.offsetLeft + step + "px";
    }
  }
  if (CtrlBlock && event.key === "ArrowDown" && collision(target, wall)) {
    wallmoveY = -10;
    if (target.offsetTop < y) {
      target.style.animationPlayState = "running";
      target.style.top = target.offsetTop + step + "px";
    }
  }
  if (event.code === "ControlLeft") {
    target.style.animationPlayState = "paused";
    target.style.backgroundSize = "676px 70px";
    CtrlBlock = false;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code === "ControlLeft") {
    target.style.backgroundSize = "676px 156px";
    CtrlBlock = true;
    target.style.animationPlayState = "paused";
  }
  if (JumpBlock && CtrlBlock && event.code === "Space") {
    target.style.animationPlayState = "paused";
    target.animate(
      [
        // keyframes
        { transform: "translate(0)" },
        { transform: "translate(0," + -h(from, to) + "px)" },
        { transform: "translate(0)" },
      ],
      {
        // timing options
        duration: 1000,
        iterations: 1,
      }
    );
    JumpBlock = false;
    WaitingAnimation();
  }
});

document.body.addEventListener("contextmenu", function (event) {
  event.stopPropagation();
});

document.addEventListener("contextmenu", contMenu);
main.addEventListener("contextmenu", contMenu);

renderList(list);
// --------------------------------------FUNCTIONS-------------------------------------------------
function renderList(source = [], targ = context) {
  if (!source.length) {
    return;
  }
  let listFragment = document.createDocumentFragment();
  source.forEach(function (listItem) {
    let item = document.createElement("button");
    item.classList.add("btn-main");
    item.innerHTML = listItem.title;
    item.addEventListener("click", listActions[listItem.action]);
    listFragment.append(item);
  });
  targ.append(listFragment);
}

function changeColor() {
  const time = 1000;
  animation = true;
  if (flag === true) return;
  else {
    clearInterval(myVar);
    clearInterval(myVar1);
    myVar = setInterval(function () {
      flag = true;
      if (!animation) return;
      let r = getRund();

      let g = getRund();
      let b = getRund();
      change.style.display = "flex";
      change.style.border =
        "2px solid " + "rgb(" + r + ", " + g + ", " + b + ")";
    }, time);

    myVar1 = setInterval(() => {
      // clearInterval(myVar1);
      if (!animation) return;
      let r = getRund();
      let g = getRund();
      let b = getRund();
      let f = wWidth - change.offsetWidth;
      let q = hWidth - change.offsetHeight;
      change.style.left = getRand(f) + "px";
      change.style.top = getRand(q) + "px";
      bod.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    }, Math.floor(Math.random() * 200 + time));
  }
}

function contMenu(event) {
  event.preventDefault();
  let clientX = event.clientX;
  let clientY = event.clientY;
  let contextStyle = getComputedStyle(context);
  
  let wContext =
    parseInt(contextStyle.getPropertyValue("width")) +
    2 * parseInt(contextStyle.getPropertyValue("border-width"));
  let hContext =
    parseInt(contextStyle.getPropertyValue("height")) +
    2 * parseInt(contextStyle.getPropertyValue("border-width"));
  if (clientX >= wWidth - wContext) {
    clientX -= wContext;
  }
  if (
    clientY >= hWidth - hContext &&
    clientY < document.documentElement.clientHeight
  ) {
    clientY -= hContext;
  }
  context.classList.add("show");
  context.style.left = clientX + "px";
  context.style.top = clientY + "px";
  document.addEventListener("click", onHideContextMenu);
}

function h(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function collision(obj1, obj2) {
  if (
    obj1.offsetLeft <= obj2.offsetLeft + obj2.offsetWidth &&
    obj1.offsetLeft + obj1.offsetWidth >= obj2.offsetLeft &&
    obj1.offsetTop + obj1.offsetHeight >= obj2.offsetTop &&
    obj1.offsetTop <= obj2.offsetTop + obj2.offsetHeight
  ) {
    step = -from;
    obj2.style.backgroundColor = "yellow";
    obj2.style.left = obj2.offsetLeft - wallmoveX + "px";
    obj2.style.top = obj2.offsetTop - wallmoveY + "px";
  } else {
    wallmoveX = 0;
    wallmoveY = 0;
    step = 5;
    obj2.style.backgroundColor = "green";
  }
  return step;
}

function getRund() {
  return Math.floor(Math.random() * 256);
}

function getRand(max) {
  return Math.floor(Math.random() * max);
}

function remove() {
  target.style.display = "none";
}

function reset() {
  target.style.top = "50%";
  target.style.left = "50%";
  bod.style.backgroundColor = "lavender";
  change.style.display = "none";
  animation = false;
  target.style.display = "flex";
}

function jump() {
  target.animate(
    [
      // keyframes
      { transform: "translate(0)" },
      { transform: "translate(0," + -h(from, to) + "px)" },
      { transform: "translate(0)" },
    ],
    {
      // timing options
      duration: 1000,
      iterations: 1,
    }
  );
}

function WaitingAnimation() {
  setTimeout(function () {
    JumpBlock = true;
    target.style.animationPlayState = "running";
  }, 1001);
}

function onHideContextMenu() {
  context.classList.remove("show");
  document.removeEventListener("click", onHideContextMenu);
}
