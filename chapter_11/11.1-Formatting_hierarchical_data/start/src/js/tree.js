import { tree } from "d3-hierarchy";
import { select } from "d3-selection";

export const drawTree = root => {
  const width = 1200;
  const height = 3000;
  const margin = { top: 60, right: 200, bottom: 0, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const treeLayoutGenerator = tree()
    .size([innerWidth, innerHeight])

  const svg = select("#tree")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
}