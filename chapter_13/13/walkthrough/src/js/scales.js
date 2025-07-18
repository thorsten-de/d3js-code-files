import { scaleRadial, scaleSequential } from "d3-scale";
import { interpolateYlGnBu } from "d3-scale-chromatic";

export const countryColorScale = scaleSequential(interpolateYlGnBu)
  .domain([1, 100])

export const getCityRadius = maxLaureates =>
  scaleRadial()
    .domain([0, maxLaureates])
    .range([0, 25])