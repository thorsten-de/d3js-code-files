const canvas = d3.select("#canvas")
  .append("canvas")
  .style("border", "1px solid black")

const container = document.querySelector("#canvas");
const width = container.offsetWidth;
const height = width / 3;

canvas
  .attr("width", width)
  .attr("height", height);


