import { pack } from "d3-hierarchy";
import { select, selectAll } from "d3-selection";
import { interpolate } from "d3-interpolate";
import { colorScale } from "./scales";

export const drawCirclePack = root => {
  const descendants = root.descendants();
  const leaves = root.leaves();

  const width = 800;
  const height = 800;
  const margin = { top: 1, right: 1, bottom: 1, left: 1 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Compute sums over the tree from root. We set the leaf node size
  // proportional to total_speakers
  root.sum(d => d.total_speakers);

  const packLayoutGenerator = pack()
    .size([innerWidth, innerHeight])
    .padding(3)

  packLayoutGenerator(root);
  console.log(root);


  const svg = select("#circle-pack")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg.selectAll(".pack-circle")
    .data(root)
    .join("circle")
    .attr("class", "pack-circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.r)
    .attr("fill", (d => {
      switch (d.depth) {
        case 1:
          return colorScale(d.id);
        case 2:
          return interpolate(colorScale(d.parent.id), "#FFFFFF")(0.5);
        default:
          return "white";
      }
    }))
    .attr("stroke", d => d.depth > 0 ? "none" : "gray");
}