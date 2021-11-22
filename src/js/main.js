const listForm = document.getElementById("form");

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
  const id = listId[listId.length - 1] + 1;

  const div = document.createElement("div");
  div.id = `list-${id}`;
  div.className = "list";

  const nameInput = document.createElement("input");
  nameInput.id = `name-${id}`;
  nameInput.className = "input-name";

  const percentInput = document.createElement("input");
  percentInput.id = `percent-${id}`;
  percentInput.className = "input-percent";

  const button = document.createElement("button");
  button.innerText = "delete";
  button.addEventListener("click", deleteToList);

  listForm.appendChild(div);
  div.appendChild(nameInput);
  div.appendChild(percentInput);
  div.appendChild(button);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const listDiv = [].slice.call(e.target.children);
  let array = [];
  let nameArray = [];
  let percentArray = [];
  listDiv.forEach((div) => {
    if (div.tagName == "DIV") {
      const id = div.id.split("-")[1];
      array.push(parseInt(id));
      const inputName = div.children[0].value;
      const inputPercent = div.children[1].value;
      nameArray.push(inputName);
      percentArray.push(parseFloat(inputPercent));
    }
  });
  listId = array;
  NameData = nameArray;
  PercentData = percentArray;
  addToList();
};

listForm.addEventListener("submit", handleSubmit);

// import { Chart } from "chart.js";

// const ctx = document.getElementById("pieChart").getContext("2d");

// const data = {
//   datasets: [
//     {
//       data: [10, 10, 10, 10, 10],
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
//     elements: {
//       arc: {
//         borderColor: "#000000",
//       },
//     },
//   },
// };
// const myChart = new Chart(ctx, config);

// console.log(myChart.data.datasets);
