import { geoEqualEarth, geoGraticule, geoPath } from "d3-geo";
import { select, selectAll } from "d3-selection";
import { countryColorScale, getCityRadius as createCityRadiusScale } from "./scales";
import { transition } from "d3-transition";
import { extent, filter, max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { drawLegend } from "./legend"
import { zoom, zoomIdentity } from "d3-zoom";
import { axisBottom } from "d3-axis";
import { format } from "d3-format";
import { brush, brushX } from "d3-brush";


const deepClone = obj => JSON.parse(JSON.stringify(obj));

const showTooltip = (name, laureates) => {
  const lastWord = laureates.length > 1 ? "laureates" : "laureate"
  const text = `${name}, ${laureates.length} ${lastWord}`;

  select("#map-tooltip")
    .text(text)
    .transition()
    .style("opacity", 1);
}

const showCountryTooltip = (e, { properties: { name, laureates } }) => showTooltip(name, laureates);

const showCityTooltip = (e, { city, laureates }) => showTooltip(city, laureates);

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
  const projection = geoEqualEarth()
    .translate([width / 2, height / 2])
    .scale(220)


  const cities = []
  laureates.forEach(l => {
    if (l.birth_country !== "" && l.birth_city !== "") {

      const relatedCity = cities.find(city =>
        city.city === l.birth_city &&
        city.country === l.birth_country);

      if (relatedCity) {
        if (relatedCity.city !== l.birth_city || relatedCity.country !== l.birth_country)
          console.log({ relatedCity, l })
        relatedCity.laureates.push(l);
      } else {
        const [cx, cy] = projection([l.birt_city_longitude, l.birt_city_latitude])
        cities.push({
          city: l.birth_city,
          country: l.birth_country,
          latitude: l.birt_city_latitude,
          longitude: l.birt_city_longitude,
          laureates: [l],
          cx,
          cy
        })
      }
    }
  });

  const dateRange = extent(laureates, d => d.year);
  let brushRange = dateRange;

  const maxLaureatesPerCity = max(cities, c => c.laureates.length)
  const cityScale = createCityRadiusScale(maxLaureatesPerCity);

  const svg = select("#map")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)


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
    .attr("stroke", "#09131b")
    .attr("stroke-opacity", 0.4)

  const filterLaureates = ({ laureates }) =>
    laureates.filter(l => l.year >= brushRange[0] && l.year <= brushRange[1])

  let isCountryMap = true;
  const updateCountryFills = () => {
    const selectedData = deepClone(world.features);
    selectedData.forEach(d => {
      d.properties.laureates = filterLaureates(d.properties)
    })


    svg.selectAll(".country-path")
      .data(selectedData)
      .on("mouseenter", showCountryTooltip)
      .on("mouseleave", hideTooltip)
      .transition()
      .attr("fill", d => (count = d.properties.laureates.length) > 0 ? countryColorScale(count) : "#f8fcff")
  }

  const displayCountries = () => {
    isCountryMap = true;
    selectAll(".circle-city")
      .transition()
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .remove();

    updateCountryFills();
    select(".legend-cities")
      .style("display", "none")
    select(".legend-countries")
      .style("display", "flex")
  }

  const displayCities = () => {
    isCountryMap = false;
    svg.selectAll(".country-path")
      .on("mouseenter", null)
      .on("mouseleave", null)
      .transition()
      .attr("fill", "#f8fcff");

    svg.selectAll(".circle-city")
      .data(cities)
      .join("circle")
      .attr("class", "circle-city")
      .attr("cx", d => d.cx)
      .attr("cy", d => d.cy)
      //     .attr("cx", d => projection([d.longitude, d.latitude])[0])
      //     .attr("cy", d => projection([d.longitude, d.latitude])[1])
      .attr("fill", "#3517c2")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "#3517c2")
    updateCityCircles();

    select(".legend-cities")
      .style("display", "block")
    select(".legend-countries")
      .style("display", "none")
  }

  const updateCityCircles = () => {
    const selectedData = deepClone(cities)
    selectedData.forEach(d => {
      d.laureates = filterLaureates(d);
    })
    selectAll(".circle-city")
      .data(selectedData)
      .on("mouseenter", showCityTooltip)
      .on("mouseleave", hideTooltip)
      .transition()
      .attr("r", d => cityScale(d.laureates.length))
  }

  selectAll("input#countries, input#cities")
    .on("click", e => {
      switch (e.target.id) {
        case "countries":
          return displayCountries();
        case "cities":
          return displayCities();
      }
    })

  displayCountries();
  drawLegend(maxLaureatesPerCity);

  // Add zoom behaviour
  const zoomHandler = zoom()
    .scaleExtent([1, 5])
    .translateExtent([[-width / 2, -height / 2], [3 * width / 2, 3 * height / 2]])
    .on("zoom", e => {
      console.log(e);
      svg.attr("transform", e.transform)

      select("#map-reset.hidden")
        .classed("hidden", false)

      if (e.transform.k === 1 && e.transform.x === 0 && e.transform.y === 0) {
        select("#map-reset")
          .classed("hidden", true);
      }

    })

  select(".map-container")
    .call(zoomHandler);

  select("#map-reset")
    .classed("hidden", true)
    .on("click", () => {
      select(".map-container")
        .transition()
        .call(zoomHandler.transform, zoomIdentity)
    })


  const tlWidth = 1000;
  const tlHeight = 80;
  const tlMargin = { top: 0, right: 10, bottom: 0, left: 0 }
  const tlinnerWidth = tlWidth - tlMargin.left - tlMargin.right;


  const xScale = scaleLinear()
    .domain(dateRange)
    .range([0, tlinnerWidth]);

  const yearsSelector = select("#years-selector")
    .append("svg")
    .attr("viewBox", `0 0 ${tlWidth} ${tlHeight}`);

  const xAxisGenerator = axisBottom(xScale)
    .tickFormat(format(""))
    .tickSizeOuter(0)

  yearsSelector.append("g")
    .attr("class", "axis-x")
    .attr("transform", `translate(0,30)`)
    .call(xAxisGenerator)

  const handleBrush = e => {

    brushRange = e.selection.map(d => Math.round(xScale.invert(d)))

    if (isCountryMap) {
      updateCountryFills();
    } else {
      updateCityCircles();
    }
  };

  const brushHandler = brushX()
    .extent([[0, 0], [tlinnerWidth, tlHeight]])
    .on("brush", handleBrush);



  yearsSelector
    .call(brushHandler)
    .call(brushHandler.move, dateRange.map(xScale))

};

