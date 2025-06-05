// Load the data here
d3.csv("../data/weekly_temperature.csv", d3.autoType)
  .then(d => drawLineChart(d));

// Create the line chart here
const drawLineChart = (data) => {
  const margin = { top: 40, right: 170, bottom: 25, left: 40 };
  const width = 800;
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


  const xData = d => xScale(d.date);
  const yAvgTempF = d => yScale(d.avg_temp_F);

  const aubergine = "#75485E";
  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 4)
    .attr("cx", xData)
    .attr("cy", d => yScale(d.avg_temp_F))
    .attr("fill", aubergine);


  const lineGenerator = d3.line()
    .x(xData)
    .y(yAvgTempF)
    .curve(d3.curveCatmullRom);

  innerChart
    .append("path")
    .attr("d", lineGenerator(data))
    .attr("fill", "none")
    .attr("stroke", aubergine);

  const areaGenerator = d3.area()
    .x(xData)
    .y0(d => yScale(d.min_temp_F))
    .y1(d => yScale(d.max_temp_F))
    .curve(d3.curveCatmullRom);

  innerChart
    .append("path")
    .attr("d", areaGenerator(data))
    .attr("fill", aubergine)
    .attr("fill-opacity", 0.2);

  innerChart
    .append("text")
    .text("Average temperature")
    .attr("x", xScale(lastDate) + 10)
    .attr("y", yScale(data[data.length - 1].avg_temp_F))
    .attr("dominant-baseline", "middle")
    .attr("fill", aubergine);

  const elem = data[data.length - 3];
  drawLabel(innerChart, xScale(elem.date), yScale(elem.min_temp_F),
    "Minimal temperature", 1, "hanging", aubergine);

  const maxElem = data[data.length - 4];
  drawLabel(innerChart, xScale(maxElem.date), yScale(maxElem.max_temp_F),
    "Maximal temperature", -1, "auto", aubergine)


};

const drawLabel = (chart, x, y, text, dir, baseline, color) => {
  chart
    .append("text")
    .text(text)
    .attr("x", x + 13)
    .attr("y", y + dir * 20)
    .attr("dominant-baseline", baseline)
    .attr("fill", color);

  chart
    .append("line")
    .attr("x1", x)
    .attr("y1", y + dir * 3)
    .attr("x2", x + 10)
    .attr("y2", y + dir * 20)
    .attr("stroke", color)
    .attr("stroke-width", 2);
}