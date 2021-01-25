const clicker = document.querySelector(".header__clicker");
const diamond = document.querySelector(".logo");
const bg = document.querySelector(".image_knight");
const button = document.getElementById("cont_but");
const shadow = document.querySelector(".content__button__shadow");
const rules = document.querySelector(".rules");
const ball1 = document.querySelector(".ballsFirst");
const ball2 = document.querySelector(".ballsSecond");
const ball3 = document.querySelector(".ballsThird");

const clickable = document.querySelector(".mob_wrapper__clikablle");
const mobileRules = document.querySelector(".mob_wrapper__rules");
const span = document.querySelectorAll("span");
const mobileBall1 = document.querySelector(".mob_wrapper__balls__ballsFirst");
const mobileBall2 = document.querySelector(".mob_wrapper__balls__ballsSecond");
const mobileBall3 = document.querySelector(".mob_wrapper__balls__ballsThird");
const mobDiamond = document.querySelector(".mob_wrapper__logo");

rules.addEventListener("mouseover", show);
rules.addEventListener("mouseout", hide);
rules.addEventListener("click", changecolor);

mobileRules.addEventListener("click", changeText);

clicker.addEventListener("click", go);
clickable.addEventListener("click", mobile);

function go(e) {
  if (diamond.style.display === "") {
    diamond.style.display = "block";
  } else {
    diamond.style.display = "";
  }
}

function mobile(e) {
  if (mobDiamond.style.display === "") {
    mobDiamond.style.display = "block";
  } else {
    mobDiamond.style.display = "";
  }
}

function show(e) {
  button.style.backgroundColor = "rgb(248, 255, 19)";
  shadow.style.display = "flex";
}
function hide(e) {
  button.style.backgroundColor = "";
  shadow.style.display = "";
}
function changecolor(e) {
  let r = getRund();
  let g = getRund();
  let b = getRund();
  button.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
}

function changeText(e) {
  let r = getRund();
  let g = getRund();
  let b = getRund();
  span.forEach(
    (el) => (el.style.color = "rgb(" + r + ", " + g + ", " + b + ")")
  );
}

function getRund() {
  return Math.floor(Math.random() * 256);
}

animation(ball1, 10, 100);
animation(ball2, 20, 80);
animation(ball3, 5, 120);

animation(mobileBall1, 10, 100);
animation(mobileBall2, 20, 80);
animation(mobileBall3, 5, 120);

function animation(el, a, b) {
  el.animate(
    [
      { transform: "translate(0" + "px)" },
      { transform: "translate(0," + -h(a, b) + "px)" },
      { transform: "translate(0," + +h(a, b) + "px)" },
      { transform: "translate(0" + "px)" },
    ],
    {
      duration: Math.floor(Math.random() * 500 + 1000),
      iterations: Infinity,
    }
  );
}

function h(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("mousemove", function (e) {
  let x = e.clientX / window.innerWidth;
  let y = e.clientY / window.innerHeight;
  bg.style.transform = "translate(-" + x * 20 + "px, -" + y * 20 + "px)";
});
