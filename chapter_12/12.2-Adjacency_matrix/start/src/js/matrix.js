import { sort, max, range } from "d3-array";
import { select, selectAll } from "d3-selection";
import { opacityScale, opacityScale } from "./scales";
import { transition } from "d3-transition";

export const drawMatrix = (nodes, edges) => {
  nodes = sort(nodes, d => -d.totalLinesNumber)

  const edgeHash = edges.reduce((acc, edge) => {
    acc[`${edge.source}->${edge.target}`] = {
      source: edge.source,
      target: edge.target,
      weight: edge.weight
    };
    acc[`${edge.target}->${edge.source}`] = {
      source: edge.target,
      target: edge.source,
      weight: edge.weight
    };
    return acc;
  }, {});

  const margin = { top: 130, right: 0, bottom: 0, left: 130 }
  const squareWidth = 16;
  const padding = 2;
  const size = nodes.length * (squareWidth + padding);

  const maxScenes = max(edges, d => d.weight)
  const sceneScale = opacityScale(maxScenes)


  const matrix = []
  nodes.forEach((charA, i) => {
    nodes.forEach((charB, j) => {
      if (charA !== charB) {
        const id = `${charA.id}->${charB.id}`
        const item = {
          id: id,
          source: charA.id,
          target: charB.id,
          x: i * (squareWidth + padding),
          y: j * (squareWidth + padding)
        }

        if (edgeHash[id]) {
          item.weight = edgeHash[id].weight;
          matrix.push(item)
        }
      }
    });
  });

  const svg = select("#matrix")
    .append("svg")
    .attr("viewBox", `0 0 ${size + margin.left} ${size + margin.top}`)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  svg.selectAll(".grid-square")
    .data(matrix)
    .join("rect")
    .attr("class", "grid-square")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", squareWidth)
    .attr("height", squareWidth)
    .attr("fill", "#364652")
    .attr("opacity", d => sceneScale(d.weight))

  const labelsContainer = svg.selectAll(".matrix-label")
    .data(nodes)
    .join("g")
    .attr("class", "matrix-label")
    .attr("dominant-baseline", "middle")
    .style("font-size", "13px")

  labelsContainer.append("text")
    .attr("class", "label-left")
    .attr("y", (d, i) => i * (squareWidth + padding) + squareWidth / 2)
    .attr("x", -8)
    .attr("text-anchor", "end")
    .text(d => d.name)

  labelsContainer.append("text")
    .attr("class", "label-top")
    .attr("transform", (d, i) => `translate(${i * (squareWidth + padding) + squareWidth / 2}, -8) rotate(-90)`)
    .text(d => d.name)

  const weights = range(1, maxScenes + 1);
  const legend = select(".matrix-legend")
    .append("ul")
    .selectAll(".legend-color-item")
    .data(weights)
    .join("li")
    .attr("class", "legend-color-item");

  legend.append("div")
    .attr("class", "legend-color-square")
    .style("opacity", d => {
      return sceneScale(d);
    })
    .style("background-color", "#364652")

  legend.append("div")
    .attr("class", "legend-color-label")
    .text(d => d)


  selectAll(".grid-square")
    .on("mouseenter", (e, d) => {
      const t = transition()
        .duration(150);

      selectAll(".label-left")
        .transition(t)
        .style("opacity", label => label.id === d.target ? 1 : 0.1);

      selectAll(".label-top")
        .transition(t)
        .style("opacity", label => label.id === d.source ? 1 : 0.1);

      const charA = nodes.find(char => char.id === d.target).name;
      const charB = nodes.find(char => char.id === d.source).name;

      select(".matrix-tooltip-charA").text(charA);
      select(".matrix-tooltip-charB").text(charB)
      select(".matrix-tooltip-scenes").text(d.weight)
      select(".matrix-tooltip").classed("hidden", false)

    })

    .on("mouseleave", (e, d) => {
      selectAll(".label-top, .label-left")
        .style("opacity", 1)

      select(".matrix-tooltip").classed("hidden", true)
    })

};