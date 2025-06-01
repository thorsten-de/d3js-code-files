// Append a SVG container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

d3.csv("../data/data.csv", row => {
  // use callback for each row to format data, here counts to integer
  return {
    tech: row.technology,
    count: +row.count
  }
}).then(data => {
  // this is a promise, so handle it after it is fulfilled
  console.log(data.length);
  console.log(d3.extent(data, d => d.count));
  //data.sort((a, b) => b.count - a.count);
  data = d3.sort(data, d => -d.count);

  createViz(data);
});

const createViz = data => {
  console.log(data)
};
