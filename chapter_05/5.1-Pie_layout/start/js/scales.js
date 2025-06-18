// Initialize the scales here
const xScale = d3.scaleBand();


const defineScales = (data) => {
  // Define the scales domain and range here
  xScale
    .domain(data.map(d => d.year))
    .range([0, innerWidth])
};