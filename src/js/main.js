import { drawRoulette } from "./roulette";
import { percentToDegree } from "./util";

const FormUl = document.getElementById("form");
const WeightInput = document.getElementById("weight-0");
const NameInput = document.getElementById("name-0");

const canvas = document.getElementById("roulette");
const ctx = canvas.getContext("2d");
const size = { width: canvas.width, height: canvas.height };

let listId = [0];
let Lable = ["Roulette"];
let Weights = [1];
let PercentData = [100];
let Degrees = [360];

const deleteToList = (e) => {
  const li = e.target.parentElement;
  const liId = li.id.split("-")[1];
  li.remove();
  listId = listId.filter((id) => id !== parseInt(liId));
  updateData();
};

const addToList = () => {
  const ul = document.getElementById("form");
  const id = listId[listId.length - 1] + 1;

  const li = document.createElement("li");
  li.id = `list-${id}`;
  li.className = "list";

  const nameInput = document.createElement("input");
  nameInput.id = `name-${id}`;
  nameInput.className = "input-name";
  nameInput.required = true;
  nameInput.addEventListener("input", handleNameInput);

  const weightInput = document.createElement("input");
  weightInput.id = `weight-${id}`;
  weightInput.className = "input-weight";
  weightInput.type = "number";
  weightInput.value = 1;
  weightInput.min = 0;
  Weights.push(1);
  weightInput.addEventListener("input", handleWeightInput);

  const percentSpan = document.createElement("span");
  percentSpan.id = `percent-${id}`;
  percentSpan.className = "percent";

  const button = document.createElement("button");
  button.innerText = "delete";
  button.addEventListener("click", deleteToList);

  ul.appendChild(li);
  li.appendChild(nameInput);
  li.appendChild(weightInput);
  li.appendChild(percentSpan);
  li.appendChild(button);
};

const calculatePercent = (value) => {
  let sum = 0;
  Weights.map((data) => {
    sum += data;
  });
  let percentage = ((value * 100) / sum).toFixed(2);
  return parseFloat(percentage);
};

const updateData = () => {
  const WeightInputs = document.querySelectorAll(".input-weight");
  Weights = [...WeightInputs].map((input) => parseInt(input.value) || 0);
  PercentData = [...WeightInputs].map((input) => {
    const calVal = calculatePercent(input.value);
    return calVal;
  });
  Degrees = PercentData.map((percent) => percentToDegree(percent));
  const PercentSpan = document.querySelectorAll(".percent");
  PercentSpan.forEach((value, index) => {
    value.innerHTML = `${PercentData[index]}%`;
  });
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoulette(ctx, Degrees, size, Lable);
};

const handleEnterKey = () => {
  listId.push(listId[listId.length - 1] + 1);
  handleNameInput();
  addToList();
  updateData();
};

const enterForm = (e) => {
  if (e.key === "Enter") {
    handleEnterKey();
  }
};

const handleWeightInput = (e) => {
  updateData();
};

const handleNameInput = (e) => {
  const NameInputs = document.querySelectorAll(".input-name");
  Lable = [...NameInputs].map((input) => input.value);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoulette(ctx, Degrees, size, Lable);
};

drawRoulette(ctx, Degrees, size, Lable);
FormUl.addEventListener("keypress", enterForm);
WeightInput.addEventListener("input", handleWeightInput);
NameInput.addEventListener("input", handleNameInput);

let tempRotate = 0;
let rotatePower = 0;
let friction = 50;

const clickButton = () => {
  rotatePower = Math.random() * (2000 - 1000) + 1000;
  rollRoulette();
};

const rollRoulette = () => {
  if (tempRotate < rotatePower) {
    tempRotate += friction;
  } else {
    rotatePower = 0;
    tempRotate += friction;
    friction -= 0.1;
  }
  if (friction < 0) {
    tempRotate = 0;
    friction = 50;
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoulette(ctx, Degrees, size, Lable, tempRotate);
  requestAnimationFrame(rollRoulette);
};

const rollBtn = document.querySelector(".roll-btn");
rollBtn.addEventListener("click", clickButton);
