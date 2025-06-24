const createTooltip = (data) => {

  const tooltipWidth = 100;
  const tooltipHeight = 190;
  const textColor = "#494e4f";
  const textLineHeight = 22;

  // Create the tooltip here
  const tooltip = innerChart.append("g")
    .attr("class", "tooltip");

  const xPos = 0;
  tooltip.append("line")
    .attr("x1", xPos)
    .attr("y1", -30)
    .attr("x2", xPos)
    .attr("y2", innerHeight)
    .attr("stroke-width", 2)
    .attr("stroke", textColor)
    .attr("stroke-dasharray", "6 4");


  const year = d3.min(data, d => d.year);
  tooltip.append("text")
    .text(year)
    .attr("class", "tooltip-year")
    .attr("x", xPos)
    .attr("y", innerHeight + 25)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", 700)
    .style("fill", textColor);

};

const handleMouseEvents = (data) => {

  // Handle the mouse events here

};