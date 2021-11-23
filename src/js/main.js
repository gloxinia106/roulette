// import { Chart } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

const PercentInput = document.getElementById("percent-0");
const NameInput = document.getElementById("name-0");

let listId = [];
let NameData = [];
let PercentData = [];

const deleteToList = (e) => {
  const div = e.target.parentElement;
  const divId = div.id.split("-")[1];
  div.remove();
  listId = listId.filter((id) => id !== parseInt(divId));
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
  nameInput.addEventListener("keypress", handleNameInput);

  const percentInput = document.createElement("input");
  percentInput.id = `percent-${id}`;
  percentInput.className = "input-percent";
  percentInput.type = "number";
  percentInput.step = "0.01";
  percentInput.min = "0";
  percentInput.max = "100";
  percentInput.value = PercentData[PercentData.length - 1];
  percentInput.addEventListener("keypress", handlePercentInput);

  const button = document.createElement("button");
  button.innerText = "delete";
  button.addEventListener("click", deleteToList);

  ul.appendChild(li);
  li.appendChild(nameInput);
  li.appendChild(percentInput);
  li.appendChild(button);
};

const calculatePercent = (value) => {
  let sum = 0;
  PercentData.map((data) => {
    sum += data;
  });
  if (sum !== 0) {
    let percentage = ((value * 100) / sum).toFixed(2);
    return parseFloat(percentage);
  } else {
    return 100;
  }
};

const handleEnterKey = () => {
  let tempids = [];
  const PercentInputs = document.querySelectorAll(".input-percent");
  const NameInputs = document.querySelectorAll(".input-name");
  PercentData = [...PercentInputs].map((input) => {
    const id = input.id.split("-")[1];
    tempids.push(parseInt(id));
    const calVal = calculatePercent(input.value);
    input.value = calVal;
    return calVal;
  });
  NameData = [...NameInputs].map((input) => input.value);
  listId = tempids;
  addToList();
  console.log(PercentData);
};

const handlePercentInput = (e) => {
  if (e.key === "Enter") {
    handleEnterKey();
  } else {
  }
  // const value = parseInt(e.target.value);
  // const index = e.target.id.split("-")[1];
  // PercentData.splice(index, 1, value);
  // UpdateToChart();
};

const handleNameInput = (e) => {
  if (e.key === "Enter") {
    handleEnterKey();
  } else {
  }
};

PercentInput.addEventListener("keypress", handlePercentInput);
NameInput.addEventListener("keypress", handleNameInput);

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
