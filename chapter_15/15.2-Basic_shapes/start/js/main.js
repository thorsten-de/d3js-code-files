const canvas = d3.select("#canvas")
  .append("canvas")
  .style("border", "1px solid black")
  .style("max-width", "100%")

const container = document.querySelector("#canvas");
const devicePixelRatio = window.devicePixelRatio;
const width = container.offsetWidth;
const height = width / 3;

canvas
  .attr("width", width * devicePixelRatio)
  .attr("height", height * devicePixelRatio);

const context = canvas.node().getContext("2d");
context.scale(devicePixelRatio, devicePixelRatio);