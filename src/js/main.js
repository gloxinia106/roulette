import { drawRoulette } from "./roulette";
import { percentToDegree } from "./util";

const Ul = document.getElementById("ul");
const WeightInput = document.getElementById("weight-0");
const NameInput = document.getElementById("name-0");
const CurrentName = document.querySelector(".current-name");
const rollBtn = document.querySelector(".roll-btn");

const colors = ["#FBC22B", "#F11486", "#A067AC", "#49A3CF", "#88E444"];

const canvas = document.getElementById("roulette");
const ctx = canvas.getContext("2d");
const size = { width: canvas.width, height: canvas.height };

let listId = [0];
let Lable = ["Roulette"];
let Weights = [1];
let PercentData = [100];
let Degrees = [360];

let PushPower = 30;

const deleteToList = (e) => {
  const li = e.target.parentElement;
  const liId = li.id.split("-")[1];
  li.remove();
  listId = listId.filter((id, index) => {
    if (id === parseInt(liId)) {
      Lable.splice(index, 1);
    }
    return id !== parseInt(liId);
  });
  updateData();
};

const addToList = () => {
  const id = Math.max(...listId) + 1;
  listId.push(id);

  const li = document.createElement("li");
  li.id = `list-${id}`;
  li.className = "list";

  const nameInput = document.createElement("input");
  nameInput.id = `name-${id}`;
  nameInput.className = "input-name";
  nameInput.placeholder = "undefined";
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
  button.innerText = "❌";
  button.className = "delete-btn";
  button.addEventListener("click", deleteToList);

  ul.appendChild(li);
  li.appendChild(button);
  li.appendChild(nameInput);
  li.appendChild(weightInput);
  li.appendChild(percentSpan);
  nameInput.focus();
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
  const NameInputs = document.querySelectorAll(".input-name");
  listId = [...NameInputs].map((input) => parseInt(input.id.split("-")[1]));
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

// 룰렛
drawRoulette(ctx, Degrees, size, Lable);
Ul.addEventListener("keypress", enterForm);
WeightInput.addEventListener("input", handleWeightInput);
NameInput.addEventListener("input", handleNameInput);

let tempRotate = 0;
let slowPoint = 0;
let rotatePower = PushPower;
let currentAngle = 270;

const clickButton = (e) => {
  slowPoint = Math.random() * (2000 - 1000) + 1000;
  e.target.style.display = "none";
  rollRoulette();
};

const rollRoulette = () => {
  // 룰렛 돌리는 코드
  if (tempRotate < slowPoint) {
    tempRotate += rotatePower;
    currentAngle -= rotatePower;
  } else if (rotatePower < 5) {
    tempRotate += rotatePower;
    currentAngle -= rotatePower;
    rotatePower -= 0.01;
  } else if (rotatePower < 10) {
    tempRotate += rotatePower;
    currentAngle -= rotatePower;
    rotatePower -= 0.05;
  } else if (tempRotate > slowPoint) {
    slowPoint = 0;
    tempRotate += rotatePower;
    currentAngle -= rotatePower;
    rotatePower -= 0.1;
  }
  if (rotatePower < 0) {
    tempRotate = 0;
    currentAngle = 270;
    rotatePower = PushPower;
    rollBtn.style.display = "block";
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoulette(ctx, Degrees, size, Lable, tempRotate);

  // 돌아가는 룰렛에 현재 위치 알아내는 코드

  while (currentAngle < 0) currentAngle += 360;
  while (currentAngle >= 360) currentAngle -= 360;

  let beginAngle = 0;
  let lastAngle = 0;

  for (let i = 0; i < Degrees.length; i = i + 1) {
    beginAngle += Degrees[i - 1] || 0;
    lastAngle += Degrees[i];

    if (currentAngle > beginAngle && currentAngle < lastAngle) {
      CurrentName.innerText = Lable[i];
      CurrentName.style.color = colors[i % colors.length];
    }
  }
  requestAnimationFrame(rollRoulette);
};

rollBtn.addEventListener("click", clickButton);
