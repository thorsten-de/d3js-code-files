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

  maxWeight = d3.max(data, d => d.max_weight_t)
  rScale = d3.scaleRadial()
    .domain([0, maxWeight])
    .range([0, 45])

  innerChart.append("text")
    .attr("x", innerWidth)
    .attr("y", innerHeight + 30)
    .text("Estimated population")
    .style("text-anchor", "end")
    .style("dominant-baseline", "hanging")

  var bottomAxis = d3.axisBottom(xScale);
  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  svg.append("text")
    .attr("y", 20)
    .text("Max size (m)")

  var leftAxis = d3.axisLeft(yScale);
  innerChart.append("g")
    .call(leftAxis);

  innerChart.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d.global_population_estimate))
    .attr("cy", d => yScale(d.max_size_m))
    .attr("r", d => rScale(d.max_weight_t))
    .attr("fill", d => colorScale(d.status))
    .attr("stroke-width", 2)
    .attr("stroke", d => colorScale(d.status))
    .attr("fill-opacity", 0.6)

};