import { max } from "d3-array";
import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import * as topojson from "topojson-client"
import { getCityRadius } from "./scales";

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

  const filtered = laureates.filter(l => l.birth_country === "France")

  const cities = []
  filtered.forEach(l => {
    const city = cities.find(c => c.city == l.birth_city);

    if (city) {
      city.laureates.push(l)
    } else {
      const [cx, cy] = projection([l.birt_city_longitude, l.birt_city_latitude])
      cities.push({
        city: l.birth_city,
        latitude: l.birt_city_latitude,
        longitude: l.birt_city_longitude,
        laureates: [l],
        cx,
        cy
      })
    }
  });

  const maxLaureatesPerCity = max(cities, c => c.laureates.length)
  const cityScale = getCityRadius(maxLaureatesPerCity);

  svg.selectAll(".circle-cits")
    .data(cities)
    .join("circle")
    .attr("class", "circle-city")
    .attr("cx", d => d.cx)
    .attr("cy", d => d.cy)
    .attr("r", d => cityScale(d.laureates.length))
    .attr("fill", "#4cb7c1")
    .attr("fill-opacity", 0.5)
    .attr("stroke", "#4cb7c1")
    .attr("stroke-width", 2);
};