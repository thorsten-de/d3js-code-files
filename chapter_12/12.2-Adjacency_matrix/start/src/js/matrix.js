import { sort, max } from "d3-array";
import { select, selectAll } from "d3-selection";
import { opacityScale, opacityScale } from "./scales";

export const drawMatrix = (nodes, edges) => {
  sort(nodes, d => d.totalLinesNumber)

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

  const margin = { top: 100, right: 0, bottom: 0, left: 100 }
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

  svg.selectAll(".character-label")
    .data(nodes)
    .join("text")
    .attr("class", d => `matrix-label label-${d.id}`)
    .attr("y", (d, i) => (i + 0.5) * (squareWidth + padding))
    .attr("x", -5)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "end")
    .style("font-size", "12px")
    .text(d => d.name)


  svg.selectAll(".character-label")
    .data(nodes)
    .join("text")
    .attr("class", d => `matrix-label label-${d.id}`)
    .attr("transform", "rotate(-90)")
    .attr("y", (d, i) => (i + 0.5) * (squareWidth + padding))
    .attr("x", 5)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "start")
    .style("font-size", "12px")
    .text(d => d.name)

};