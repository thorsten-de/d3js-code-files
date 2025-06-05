// Load the data here
d3.csv("../data/weekly_temperature.csv", d3.autoType)
  .then(d => drawLineChart(d));

// Create the line chart here
const drawLineChart = (data) => {
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 600;
  const height = 400;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  const firstDate = new Date(2021, 0, 01, 0, 0, 0);
  const lastDate = d3.max(data, d => d.date);
  const xScale = d3.scaleTime()
    .domain([firstDate, lastDate])
    .range([0, innerWidth]);

  const maxTemp = d3.max(data, d => d.max_temp_F);
  const yScale = d3.scaleLinear()
    .domain([0, maxTemp])
    .range([innerHeight, 0]);

  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%b"));

  innerChart
    .append("g")
    .attr("class", "axis-x")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  d3.selectAll(".axis-x text")
    .attr("y", 10)
    .attr("x", d => {
      const currentMonth = d;
      const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
      return xScale(nextMonth) / 2 - xScale(currentMonth) / 2;
    })


  const leftAxis = d3.axisLeft(yScale);
  innerChart
    .append("g")
    .attr("class", "axis-y")
    .call(leftAxis);

  d3.selectAll(".axis-y text")
    .attr("x", -5);

  svg
    .append("text")
    .text("Temperature (°F)")
    .attr("y", 20)

};
