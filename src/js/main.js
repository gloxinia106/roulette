import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const FormUl = document.getElementById("form");
const WeightInput = document.getElementById("weight-0");
const NameInput = document.getElementById("name-0");

let listId = [0];
let Lable = [];
let Weights = [1];
let PercentData = [];

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
  const PercentSpan = document.querySelectorAll(".percent");
  PercentSpan.forEach((value, index) => {
    value.innerHTML = `${PercentData[index]}%`;
  });
  myChart.data.datasets[0].data = Weights;
  myChart.update();
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
  myChart.data.labels = Lable;
  myChart.update();
};

FormUl.addEventListener("keypress", enterForm);
WeightInput.addEventListener("input", handleWeightInput);
NameInput.addEventListener("input", handleNameInput);

const ctx = document.getElementById("pieChart").getContext("2d");

const data = {
  labels: Lable,
  datasets: [
    {
      data: Weights,
      backgroundColor: [
        "rgba(251, 194, 044, 1)",
        "rgba(240, 020, 134, 1)",
        "rgba(160, 103, 173, 1)",
        "rgba(070, 163, 210, 1)",
        "rgba(140, 227, 061, 1)",
      ],
    },
  ],
};

const config = {
  type: "pie",
  data: data,
  plugins: [ChartDataLabels],
  options: {
    events: [],
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "white",
        font: {
          weigh: "bold",
          size: 30,
          // family: ""
        },
        formatter: (_, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
    // elements: {
    //   arc: {
    //     borderColor: "#000000",
    //   },
    // },
  },
};
const myChart = new Chart(ctx, config);
