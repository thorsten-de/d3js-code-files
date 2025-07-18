import { select, selectAll } from "d3-selection";
import { treemap } from "d3-hierarchy";
import { colorScale } from "./scales";


export const drawTreemap = root => {
  const width = 1200;
  const height = 800;
  const margin = { top: 2, right: 2, bottom: 2, left: 2 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const treemapGenerator = treemap()
    .size([innerWidth, innerHeight])
    .paddingInner(2)
    .paddingOuter(2)
    .round(true);

  root.sum(d => d.total_speakers);

  treemapGenerator(root)
  console.log(root.leaves())

  const svg = select("#treemap")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${margin.left} ${margin.top})`);

  svg.selectAll(".treemap-node")
    .data(root.leaves())
    .join("g")
    .attr("class", "treemap-node");

  svg.selectAll(".treemap-node")
    .append("rect")
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => colorScale(d.parent.parent.id))
    .attr("rx", 4)
    .attr("ry", 4)
    .append("title")
    .text(d => d.id)

  const labelClass = d => `treemap-label-${d.id.replaceAll(" ", "-").replaceAll("'", "")}`

  svg.selectAll(".treemap-node")
    .append("text")
    .attr("class", d => "treemap-label " + labelClass(d))
    .attr("x", d => d.x0 + 5)
    .attr("y", d => d.y0 + 15)
    .attr("fill", "white")
    .style("font-size", "12px")
    .style("font-weight", 500)
    .text(d => d.id)

  selectAll(".treemap-label")
    .style("opacity", d => {
      const textElement = document.querySelector("." + labelClass(d));
      const textWidth = textElement.getBBox().width;
      console.log(textWidth);
      return (d.y1 - d.y0) >= 25 && ((d.x1 - d.x0) >= textWidth + 10) ? 1 : 0
    });

}