import { tree } from "d3-hierarchy";
import { select } from "d3-selection";
import { link, curveBumpX } from "d3-shape";
import { colorScale, getRadius } from "./scales";
import { max } from "d3-array";

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

  const getColor = d => {
    switch (d.depth) {
      case 1: return colorScale(d.id)
      case 2: return colorScale(d.parent.id)
      case 3: return colorScale(d.parent.parent.id)
      default: return null
    }
  }

  console.log(root.links())

  svg.selectAll(".tree-link")
    .data(root.links())
    .join("path")
    .attr("class", "tree-link")
    .attr("d", d => linkGenerator(d))
    .attr("fill", "none")
    .attr("stroke", d => getColor(d.source) ?? "gray")
    .attr("stroke-width", 2)

    .attr("stroke-opacity", 0.6);

  const maxSpeakers = max(root.leaves(), d => d.data.total_speakers);
  svg.selectAll(".node-tree")
    .data(root)
    .join("circle")
    .attr("class", "node-tree")
    .attr("cx", d => d.y)
    .attr("cy", d => d.x)
    .attr("r", d => d.depth === 3
      ? getRadius(maxSpeakers, d.data.total_speakers) : 4)
    .attr("fill", d => d.depth === 3 ? getColor(d) : "white")
    .attr("fill-opacity", d => d.depth === 3 ? 0.3 : 1)
    .attr("stroke", d => d.depth === 3 ? "none" : getColor(d) ?? "gray")
    .attr("stroke-width", 2)
}