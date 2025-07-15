import { sort, max } from "d3-array";
import { select } from "d3-selection";
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
    .attr("viewBox", `0 0 ${size} ${size}`)

  svg.selectAll("rect")
    .data(matrix)
    .join("rect")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", squareWidth)
    .attr("height", squareWidth)
    .attr("fill", "#364652")
    .attr("opacity", d => sceneScale(d.weight))
};