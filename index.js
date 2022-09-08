import "./styles.css";
import Chart from "chart.js/auto";

const chartDiv = document.getElementById("chart-div");
const chartCanvas = document.getElementById("chart-canvas");
const outputP = document.getElementById("output-p");
const testButton = document.getElementById("test-button");
testButton.addEventListener("click", test);

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

function makeChart(xValuesInitial, yValuesInitial, title) {
  const data = {
    labels: xValuesInitial,
    datasets: [
      {
        label: title,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: yValuesInitial
      }
    ]
  };

  const config = {
    type: "line",
    data: data,
    options: {}
  };

  return new Chart(chartCanvas, config);
}

const chart = makeChart([], [], "Temperature vs Time");
const xValues = [];
const yValues = [];

for (let time = 0; time <= 60; time++) {
  xValues.push(time);
  let temperature =
    20 +
    1080 *
      (1 - 0.325 * Math.exp(-0.167 * time) - 0.675 * Math.exp(-2.5 * time));
  yValues.push(temperature);
}

function test() {
  xValues.forEach((value, index) => {
    setTimeout(() => {
      let time = value;
      let temperature = Math.round(yValues[index]);

      outputP.innerText = `t(${time}) = ${temperature}\u00B0C`;

      // ______________________________________
      // < Jy gaan die API call hier moet maak. >
      //  --------------------------------------
      //         \   ^__^
      //          \  (oo)\_______
      //             (__)\       )\/\
      //                 ||----w |
      //                 ||     ||
      // ***************************************

      addData(chart, time, temperature);
    }, index * 1000);
  });
}
