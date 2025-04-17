const colorCodecontainer = document.getElementById("color-code");
const optionContainer = document.getElementById("options-container");
let randomColor = null;
let score = 0;
const scoreContainer = document.getElementById("score");

function generateRandomNumberBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min) + 1);
}
function generateRandomColorRGB() {
  const red = generateRandomNumberBetween(0, 255);
  const green = generateRandomNumberBetween(0, 255);
  const blue = generateRandomNumberBetween(0, 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

function startGame() {
  score = Number(window.localStorage.getItem("score") ?? 0);
  scoreContainer.innerText = score;
  optionContainer.innerHTML = null;
  randomColor = generateRandomColorRGB();
  colorCodecontainer.innerText = randomColor;
  const answerIndex = generateRandomNumberBetween(0, 5);
  for (let i = 0; i < 6; i++) {
    const div = document.createElement("div");
    div.addEventListener("click", ValidateResult);
    div.style.backgroundColor =
      i === answerIndex ? randomColor : generateRandomColorRGB();
    optionContainer.append(div);
  }
}

function incrementColor() {
  score += 1;
  scoreContainer.innerText = score;
}

function ValidateResult(e) {
  const selectedColor = e.target.style.backgroundColor;
  if (selectedColor === randomColor) {
    incrementColor();
  } else {
    score = 0;
  }
  window.localStorage.setItem("score", score);
  startGame();
}

window.addEventListener("load", () => startGame());
