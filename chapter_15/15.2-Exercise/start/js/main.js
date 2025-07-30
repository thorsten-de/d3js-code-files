
const canvas = d3.select("#canvas")
  .append("canvas")
  .style("border", "1px dotted gray")
  .style("max-width", "100%");

const container = document.querySelector("#canvas");
const deviceRatio = window.devicePixelRatio;
const width = Math.min(container.offsetWidth, 400);
const height = width;

canvas
  .attr("width", width * deviceRatio)
  .attr("height", height * deviceRatio)

const context = canvas.node().getContext("2d");
context.scale(deviceRatio, deviceRatio);

context.rect(100, 100, 200, 200);
context.strokeStyle = "black";
context.lineWidth = 3;
context.stroke();

context.beginPath();
context.ellipse(200, 200, 100, 100, 0, 0, 2 * Math.PI);
context.fillStyle = "plum";
context.fill();

context.beginPath();
context.moveTo(100, 100)
context.lineTo(300, 300)
context.moveTo(100, 300)
context.lineTo(300, 100)
context.stroke();

context.textAlign = "center"
context.font = "18px sans-serif"
context.fillStyle = "black"
context.fillText("Canvas is awesome!", 200, 92)