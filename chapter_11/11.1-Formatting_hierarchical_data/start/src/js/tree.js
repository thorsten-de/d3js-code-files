import { tree } from "d3-hierarchy";
import { select } from "d3-selection";
import { link, curveBumpX } from "d3-shape";

export const drawTree = root => {
  const width = 1200;
  const height = 3000;
  const margin = { top: 60, right: 200, bottom: 0, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // x/width and y/height are swapped to produce the tree left-to-right

  const treeLayoutGenerator = tree()
    .size([innerHeight, innerWidth])

  treeLayoutGenerator(root)

  const svg = select("#tree")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const linkGenerator = link(curveBumpX)
    .x(d => d.y)
    .y(d => d.x);


  svg.selectAll(".tree-link")
    .data(root.links())
    .join("path")
    .attr("class", "tree-link")
    .attr("d", d => linkGenerator(d))
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("stroke-opacity", 0.6);
}