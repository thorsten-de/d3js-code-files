import { geoEqualEarth, geoGraticule, geoPath } from "d3-geo";
import { select } from "d3-selection";
import { countryColorScale } from "./scales";
import { transition } from "d3-transition";

const showTooltip = (e, { properties: p }) => {
  const lastWord = p.laureates.length > 1 ? "laureates" : "laureate"
  const text = `${p.name}, ${p.laureates.length} ${lastWord}`;

  select("#map-tooltip")
    .text(text)
    .transition()
    .style("opacity", 1);
}

const hideTooltip = () => {
  select("#map-tooltip")
    .transition()
    .style("opacity", 0)
}

export const drawWorldMap = (laureates, world) => {
  const width = 1230;
  const height = 620;

  world.features.forEach(country => {
    const props = country.properties;
    props.laureates = laureates.filter(l => l.birth_country === props.name)
  })

  const svg = select("#map")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)

  const projection = geoEqualEarth()
    .translate([width / 2, height / 2])
    .scale(220)

  const geoPathGenerator = geoPath()
    .projection(projection);

  const graticuleGenerator = geoGraticule();

  const graticules = svg.append("g")
    .attr("fill", "transparent")
    .attr("stroke", "#09131b")
    .attr("stroke-opacity", 0.2)

  graticules.append("path")
    .datum(graticuleGenerator)
    .attr("d", geoPathGenerator)

  graticules.append("path")
    .datum(graticuleGenerator.outline)
    .attr("d", geoPathGenerator)


  svg.selectAll(".country-path")
    .data(world.features)
    .join("path")
    .attr("class", "country-path")
    .attr("d", geoPathGenerator)
    .attr("fill", d => (count = d.properties.laureates.length) > 0
      ? countryColorScale(count) : "#f8fcff")
    .attr("stroke", "#09131b")
    .attr("stroke-opacity", 0.4)
    .on("mouseenter", showTooltip)
    .on("mouseleave", hideTooltip)
};