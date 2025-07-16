import { scalePoint } from "d3-scale";
import { houses } from "./helper";
import { select, selectAll } from "d3-selection";
import { colorScale, getRadius } from "./scales";
import { max } from "d3-array";
import { curveCardinal, line } from "d3-shape";

const deepClone = obj =>
  JSON.parse(JSON.stringify(obj));

export const drawArcDiagram = (nodes, edges) => {

  // Dimensions
  const width = 1140;
  const height = 400;
  const margin = { top: height - 200, right: 100, bottom: 0, left: 100 };
  const innerWidth = width - margin.right - margin.left;

  const arcNodes = deepClone(nodes);

  arcNodes.sort((a, b) => {
    const diff = houses.find(h => h.house === a.house).order -
      houses.find(h => h.house === b.house).order
    return diff !== -1000
      ? diff
      : b.totalLinesNumber - a.totalLinesNumber
  });

  const xScale = scalePoint()
    .domain(arcNodes.map(n => n.id))
    .range([0, innerWidth]);

  const nodeHash = arcNodes.reduce((acc, node) => {
    node.x = xScale(node.id);
    acc[node.id] = node;
    return acc;
  }, {})

  const arcEdges = deepClone(edges);
  arcEdges.forEach(edge => {
    edge.source = nodeHash[edge.source];
    edge.target = nodeHash[edge.target];
  });


  const maxLines = max(nodes, n => n.totalLinesNumber);
  const svg = select("#arc")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const getArc = d =>
    line()
      .curve(curveCardinal)([
        [d.source.x, 0],
        [(d.source.x + d.target.x) / 2, -Math.abs((d.source.x - d.target.x)) / 6],
        [d.target.x, 0]
      ]);


  svg.selectAll(".arc-link")
    .data(arcEdges)
    .join("path")
    .attr("class", "arc-link")
    .attr("d", d => getArc(d))
    .attr("fill", "none")
    .attr("stroke", "#364652")
    .attr("stroke-width", d => d.width)
    .attr("stroke-opacity", 0.1)
    .attr("stroke-linecap", "round")


  svg.selectAll(".arc-node")
    .data(arcNodes.sort((a, b) => b.totalLinesNumber - a.totalLinesNumber))
    .join("circle")
    .attr("class", "arc-node")
    .attr("cx", d => d.x)
    .attr("cy", 0)
    .attr("r", d => getRadius(maxLines, d.totalLinesNumber))
    .attr("fill", d => colorScale(d.house))
    .attr("stroke", "#FAFBFF")
    .attr("stroke-width", 2)


  svg.selectAll(".arc-label")
    .data(arcNodes)
    .join("text")
    .attr("class", "arc-label")
    .attr("text-anchor", "end")
    .attr("dominant-baseline", "middle")
    .attr("transform", d => `translate(${d.x}, 70), rotate(-70)`)
    .text(d => d.name)
    .style("font-size", "14px")

};