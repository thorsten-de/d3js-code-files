const drawStackedBars = (data) => {
  // Generate the stacked bar chart here


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3.select("#bars")
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


};