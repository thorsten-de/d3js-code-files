import { scaleOrdinal, scaleRadial } from "d3-scale";
import { languageFamilies } from "./helper";

export const colorScale = scaleOrdinal()
  .domain(languageFamilies.map(f => f.label))
  .range(languageFamilies.map(f => f.color));


export const getRadius = (maxSpeakers, speakers) => {
  return scaleRadial()
    .domain([0, maxSpeakers])
    .range([0, 83])(speakers);
}