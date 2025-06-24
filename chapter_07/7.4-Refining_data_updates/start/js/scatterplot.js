const drawScatterplot = (data) => {

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const maxSize = d3.max(data, d => d.max_size_m);
  yScale = d3.scaleLinear()
    .domain([0, maxSize])
    .range([innerHeight, 0])
    .nice();

  const maxPopulation = d3.max(data, d => d.global_population_estimate)
  xScale = d3.scaleLog()
    .domain(([1, maxPopulation]))
    .range([0, innerWidth])
    .nice();

  colorScale = d3.scaleOrdinal()
    .domain(conservationStatuses.map(s => s.id))
    .range(conservationStatuses.map(s => s.color));

  maxWeight = d3.max(data, d => d.max_wight_t)
  rScale = d3.scaleRadial()
    .domain([0, maxWeight])
    .range([0, 45])
};