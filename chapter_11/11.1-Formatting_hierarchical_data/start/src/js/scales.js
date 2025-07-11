import { scaleOrdinal } from "d3-scale";
import { languageFamilies } from "./helper";

export const colorScale = scaleOrdinal()
  .domain(languageFamilies.map(f => f.label))
  .range(languageFamilies.map(f => f.color));