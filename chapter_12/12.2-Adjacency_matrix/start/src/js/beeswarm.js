import { select, selectAll } from "d3-selection";
import { colorScale } from "./scales";
import { forceSimulation } from "d3-force";

export const drawBeeswarm = (nodesOrig) => {

  // Dimensions
  const width = 1140;
  const height = 400;

  const nodes = JSON.parse(JSON.stringify(nodesOrig))


  const svg = select("#beeswarm")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  svg.selectAll(".beeswarm-circle")
    .data(nodes)
    .join("circle")
    .attr("class", "beeswarm-circle")
    .attr("r", 8)
    .attr("fill", d => colorScale(d))
    .attr("stroke", "#FAFBFF")
    .attr("stroke-width", 1)

  const updateNetwork = () => {
    selectAll(".beeswarm-circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  const simulation = forceSimulation()
    .nodes(nodes)
    .on("tick", updateNetwork);
};