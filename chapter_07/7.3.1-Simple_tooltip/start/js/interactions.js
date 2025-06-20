const createTooltip = () => {
  const tooltip = innerChart.append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)

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
  innerChart.selectAll("circle")
    .on("mouseenter", (e, d) => {
      console.log(e, d)

      d3.select(".tooltip text")
        .text(`${d3.format(".3")(d.avg_temp_F)}°F`)

      const cx = e.target.getAttribute("cx");
      const cy = e.target.getAttribute("cy");

      d3.select(".tooltip")
        .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
        .transition()
        .duration(200)
        .style("opacity", 1)
    })
    .on("mouseleave", (e, d) => {
      d3.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", "translate(0, 500)")
    });
}