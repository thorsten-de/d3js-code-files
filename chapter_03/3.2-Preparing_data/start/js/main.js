// Append a SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 600 700")

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

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale(d.tech)})`);

  barAndLabel
    .append("rect")
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("x", 100)
    .attr("y", 0)
    .attr("fill", d => d.tech === "D3.js" ? "steelblue" : "lightsteelblue")

  barAndLabel
    .append("text")
    .text(d => d.tech)
    .attr("x", 96)
    .attr("y", 12)
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "11px");

  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => 100 + xScale(d.count) + 4)
    .attr("y", 12)
    .style("font-family", "sans-serif")
    .style("font-size", "9px");

  svg
    .append("line")
    .attr("x1", 100)
    .attr("y1", 0)
    .attr("x2", 100)
    .attr("y2", 700)
    .attr("stroke", "black");
}
