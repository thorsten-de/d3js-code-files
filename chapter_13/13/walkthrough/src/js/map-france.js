import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import * as topojson from "topojson-client"

export const drawFranceMap = (laureates, france) => {
  let departments = topojson.feature(france,
    france.objects.FRA_adm2).features;

  let borders = topojson.mesh(france,
    france.objects.FRA_adm2);

  const width = 800;
  const height = 800;

  const projection = geoMercator()
    .scale(3000)
    .translate([250, 3150]);

  const geoPathGenerator = geoPath()
    .projection(projection);

  const svg = select("#map-france")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);


  svg
    .selectAll(".department")
    .data(departments)
    .join("path")
    .attr("class", "department")
    .attr("d", geoPathGenerator)
    .attr("fill", "#f8fcff");

  svg.append("path")
    .attr("class", "department-borders")
    .attr("d", geoPathGenerator(borders))
    .attr("fill", "none")
    .attr("stroke", "#09131b")
    .attr("stroke-opacity", 0.4)

};