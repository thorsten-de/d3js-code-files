const drawStreamGraph = (data) => {
  // Generate the streamgraph here


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3.select("#streamgraph")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const stackGenerator = d3.stack()
    .keys(formatsInfo.map(f => f.id));

  const annotatedData = stackGenerator(data);

  // the last series is stacked at the top, so get the max y1 from there
  const maxUpperBoundary = d3.max(annotatedData[annotatedData.length - 1], d => d[1]);

  const yScale = d3.scaleLinear()
    .domain([0, maxUpperBoundary])
    .range([innerHeight, 0])
    .nice();

  const bottomAxis = d3.axisBottom(xScale)
    .tickValues(d3.range(1975, 2020, 5))
    .tickSizeOuter(0)
    .tickSize(innerHeight * -1);

  innerChart
    .append("g")
    .attr("class", "x-axis-streamgraph")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  const areaGenerator = d3.area()
    .x(d => xScale(d.data.year) + xScale.bandwidth() / 2)
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveCatmullRom)

  innerChart
    .append("g")
    .attr("class", "areas-container")
    .selectAll("path")
    .data(annotatedData)
    .join("path")
    .attr("d", areaGenerator)
    .attr("fill", d => colorScale(d.key))

  const leftAxis = d3.axisLeft(yScale);
  innerChart.append("g")
    .call(leftAxis);

  const leftAxisLabel = svg.append("text")
    .attr("dominant-baseline", "hanging");

  leftAxisLabel.append("tspan")
    .text("Total revenue");

  leftAxisLabel.append("tspan")
    .text("(million USD)")
    .attr("dx", 5)
    .attr("fill-opacity", 0.7)

  leftAxisLabel.append("tspan")
    .text("Adjusted for inflation")
    .attr("x", 0)
    .attr("dy", 20)
    .attr("fill-opacity", 0.7)
    .style("font-size", "14px")
};