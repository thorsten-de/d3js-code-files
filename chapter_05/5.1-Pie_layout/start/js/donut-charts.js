const drawDonutCharts = (data) => {
  const svg = d3.select("#donut")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const donutContainers = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

};