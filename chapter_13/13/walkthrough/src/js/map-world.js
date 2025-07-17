import { geoEqualEarth, geoPath } from "d3-geo";
import { select } from "d3-selection";

export const drawWorldMap = (laureates, world) => {
  const width = 1230;
  const height = 620;

  const svg = select("#map")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)

  const projection = geoEqualEarth();
  const geoPathGenerator = geoPath()
    .projection(projection);


  svg.selectAll(".country-path")
    .data(world.features)
    .join("path")
    .attr("class", "country-path")
    .attr("d", geoPathGenerator)
    .attr("fill", "#f8fcff")
    .attr("stroke", "#09131b")
    .attr("stroke-opacity", 0.4)


};