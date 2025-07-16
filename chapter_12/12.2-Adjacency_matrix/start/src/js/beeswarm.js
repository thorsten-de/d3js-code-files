import { select, selectAll } from "d3-selection";
import { colorScale, getRadius } from "./scales";
import { forceCenter, forceCollide, forceManyBody, forceSimulation, forceX, forceY } from "d3-force";
import { max, sort } from "d3-array";

export const drawBeeswarm = (nodesOrig) => {

  // Dimensions
  const width = 1140;
  const height = 400;

  const nodes = JSON.parse(JSON.stringify(nodesOrig))

  const maxLines = max(nodes, d => d.totalLinesNumber)

  const svg = select("#beeswarm")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  svg.selectAll(".beeswarm-circle")
    .data(nodes)
    .join("circle")
    .attr("class", "beeswarm-circle")
    .attr("r", d => {
      d.radius = getRadius(maxLines, d.totalLinesNumber)
      return d.radius
    }
    )
    .attr("fill", d => colorScale(d.house))
    .attr("stroke", "#FAFBFF")
    .attr("stroke-width", 1)

  const updateNetwork = () => {
    selectAll(".beeswarm-circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  const simulation = forceSimulation()
    .nodes(nodes)
    //.force("x", forceX(0).strength(0.01))
    //.force("y", forceY(0).strength(0.01))
    //.force("y", forceY(d => d.totalLinesNumber))
    //   .force("x", forceX(0))
    .force("y", forceY(0))
    .force("collide", forceCollide().radius(d => d.radius + 2))
    //.force("center", forceCenter().x(-10).y(5))
    //    .force("charge", forceManyBody().strength(-4))


    .on("tick", updateNetwork);
};