// Append a SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 600 700")
  .style("border", "1px solid black");

d3.csv("../data/data.csv", row => {
  // use callback for each row to format data, here counts to integer
  return {
    tech: row.technology,
    count: +row.count
  }
}).then(data => {
  // this is a promise, so handle it after it is fulfilled
  console.log(data.length);
  console.log(d3.extent(data, d => d.count));
  //data.sort((a, b) => b.count - a.count);
  data = d3.sort(data, d => -d.count);

  createViz(data);
});

const createViz = data => {
  const maxCount = d3.max(data, d => d.count);
  const xScale = d3.scaleLinear()
    .domain([0, maxCount])
    .range([0, 450]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.tech))
    .range([0, 700])
    .paddingInner(0.2);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("x", 100)
    .attr("y", d => yScale(d.tech))
    .attr("fill", d => d.tech === "D3.js" ? "steelblue" : "lightsteelblue")
}
