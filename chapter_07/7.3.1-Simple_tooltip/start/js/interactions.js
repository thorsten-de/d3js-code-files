const createTooltip = () => {
  const tooltip = innerChart.append("g")
    .attr("class", "tooltip")

  tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", aubergine)
    .attr("fill-opacity", 0.75)
  tooltip.append("text")
    .text("0.00°F")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .style("font-weight", 900)


}

const handleMouseEvents = () => {

  // Handle mouse events here

}