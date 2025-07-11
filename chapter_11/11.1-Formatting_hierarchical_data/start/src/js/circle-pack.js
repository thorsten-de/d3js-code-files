import { pack } from "d3-hierarchy";
import { select, selectAll } from "d3-selection";
import { interpolate } from "d3-interpolate";
import { format } from "d3-format";
import { colorScale } from "./scales";

export const drawCirclePack = root => {
  const descendants = root.descendants();
  const leaves = root.leaves();

  const width = 800;
  const height = 800;
  const margin = { top: 1, right: 1, bottom: 1, left: 1 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Compute sums over the tree from root. We set the leaf node size
  // proportional to total_speakers
  root.sum(d => d.total_speakers);

  const packLayoutGenerator = pack()
    .size([innerWidth, innerHeight])
    .padding(3)

  packLayoutGenerator(root);


  const svg = select("#circle-pack")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg.selectAll(".pack-circle")
    .data(root)
    .join("circle")
    .attr("class", d => `pack-circle pack-circle-depth-${d.depth}`)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => d.r)
    .attr("fill", (d => {
      switch (d.depth) {
        case 1:
          return colorScale(d.id);
        case 2:
          return interpolate(colorScale(d.parent.id), "#FFFFFF")(0.5);
        default:
          return "white";
      }
    }))
    .attr("stroke", d => d.depth > 0 ? "none" : "gray");

  // Add labels with regular html divs if circles are large enough
  const minRadius = 22;
  svg.selectAll(".leaf-label-container")
    .data(leaves.filter(l => l.r >= minRadius))
    .join("foreignObject")
    .attr("class", "leaf-label-container")
    .attr("width", d => 2 * d.r)
    .attr("height", 40)
    .attr("x", d => d.x - d.r)
    .attr("y", d => d.y - 20)
    .append("xhtml:div")
    .attr("class", "leaf-label")
    .text(d => d.id);

  // add tooltips
  selectAll(".pack-circle-depth-3, foreignObject")
    .on("mouseenter", (e, d) => {
      select("#info .info-language").text(d.id);
      select("#info .info-branch .information").text(d.parent.id);
      select("#info .info-family .information").text(d.parent.parent.id);
      select("#info .info-total-speakers .information").text(format(".3s")(d.data.total_speakers));
      select("#info .info-native-speakers .information").text(format(".3s")(d.data.native_speakers));

      select("#instructions").classed("hidden", true);
      select("#info").classed("hidden", false);
    })
    .on("mouseleave", () => {
      select("#instructions").classed("hidden", false);
      select("#info").classed("hidden", true)
    });
}