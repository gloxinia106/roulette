// import { Chart } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

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
  console.log(Weights);
  PercentData = [...WeightInputs].map((input) => {
    const calVal = calculatePercent(input.value);
    return calVal;
  });
  const PercentSpan = document.querySelectorAll(".percent");
  PercentSpan.forEach((value, index) => {
    value.innerHTML = `${PercentData[index]}%`;
  });
};

const handleEnterKey = () => {
  listId.push(listId[listId.length - 1] + 1);
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

const handleNameInput = (e) => {};

FormUl.addEventListener("keypress", enterForm);
WeightInput.addEventListener("input", handleWeightInput);
NameInput.addEventListener("input", handleNameInput);

// const UpdateToChart = () => {
//   myChart.data.datasets[0].data = PercentData;
//   myChart.update();
// };

// const ctx = document.getElementById("pieChart").getContext("2d");

// const data = {
//   datasets: [
//     {
//       data: [10, 20, 30, 20, 20],
//       backgroundColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//       ],
//     },
//   ],
// };

// const config = {
//   type: "pie",
//   data: data,
//   options: {
//     responsive: false,
//     events: [],
//     plugins: {
//       datalabels: {
//         formatter: (value, ctx) => {
//           let sum = 0;
//           let dataArr = ctx.chart.data.datasets[0].data;
//           dataArr.map((data) => {
//             sum += data;
//           });
//           let percentage = ((value * 100) / sum).toFixed(2) + "%";
//           return percentage;
//         },
//       },
//     },
//     // elements: {
//     //   arc: {
//     //     borderColor: "#000000",
//     //   },
//     // },
//   },
//   plugins: [ChartDataLabels],
// };
// const myChart = new Chart(ctx, config);

// console.log(myChart.options.elements.arc);

// const handleSubmit = (e) => {
//   e.preventDefault();
//   let tempids = [];
//   NameData = [...nameInputs].map((input) => {
//     const id = input.id.split("-")[1];
//     tempids.push(parseInt(id));
//     return input.value;
//   });
//   PercentData = [...percentInputs].map((input) => {
//     if (input.value === "100" || input.value === "") {
//       const percentValue = Math.round((100 / percentInputs.length) * 100) / 100;
//       return percentValue;
//     }
//     return input.value;
//   });
//   console.log(PercentData);
//   listId = tempids;
//   addToList();
//   // UpdateToChart();
//   percentInputs = document.querySelectorAll(".input-percent");
//   nameInputs = document.querySelectorAll(".input-name");
//   percentInputs.forEach((input) =>
//     input.addEventListener("keypress", handlePercentInput)
//   );
// };
