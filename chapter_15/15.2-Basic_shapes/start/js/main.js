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

// draw a line

context.beginPath();
context.moveTo(66, 60)
context.lineTo(186, 300);
context.stroke();

// draw rectangles
context.rect(346, 33, 160, 80);
context.roundRect(346, 133, 160, 80, [20]);
context.fillStyle = "#6ba5d7";
context.fill();

context.beginPath();
context.rect(346, 233, 80, 80);
context.strokeStyle = "#6ba5d7"
context.stroke();

context.beginPath();
context.arc(706, 106, 66, 0, 2 * Math.PI);
context.strokeStyle = "#81c21c";
context.lineWidth = 3;
context.stroke();

context.beginPath();
context.ellipse(706, 273, 66, 40, 0, 0, 2 * Math.PI)
context.fillStyle = "#81c21c";
context.fill();