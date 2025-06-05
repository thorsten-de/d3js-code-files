// Load the data here
d3.csv("../data/weekly_temperature.csv", d3.autoType)
  .then(d => drawLineChart(d));

// Create the line chart here
const drawLineChart = (data) => {
  console.log("Temperature data", data)

};