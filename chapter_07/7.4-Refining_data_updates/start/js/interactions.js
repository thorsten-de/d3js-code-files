const populateFilters = () => {

  const filters = d3.select("#filters")
    .selectAll(".filter")
    .data(cetaceanFilters)
    .join("button")
    .attr("class", d => `filter filter-${d.id} ${d.isActive ? "active" : ""}`);

  filters
    .append("span")
    .attr("class", "filter-icon")
    .style("background-image", d => `url(./assets/icon-${d.id}.svg)`);

  filters
    .append("span")
    .attr("class", "filter-text")
    .text(d => d.label);

};



const handleClickOnFilter = (data) => {
  d3.selectAll(".filter")
    .on("click", (e, datum) => {
      if (datum.isActive)
        return;

      const t = d3.transition()
        .duration(1000)
        .ease(d3.easeExpOut);

      cetaceanFilters.forEach(h => h.isActive = h.id === datum.id);

      d3.selectAll(".filter")
        .classed("active", d => d.id === datum.id)

      const updatedData = datum.id === "all"
        ? data
        : data.filter(d => d.hemisphere === datum.id)

      innerChart
        .selectAll("circle")
        .data(updatedData, d => d.uid)
        .join(
          enter => {
            const circles = enter
              .append("circle")
              .attr("class", "cetacean")
              .attr("cy", d => -50)
              .attr("r", 0)
              .style("opacity", 0)
              .attr("cx", d => xScale(d.global_population_estimate))
              .attr("fill", d => colorScale(d.status))
              .attr("stroke-width", 2)
              .attr("stroke", d => colorScale(d.status))
              .attr("fill-opacity", 0.6)
              .call(enter => enter.transition(t)
                .attr("cy", d => yScale(d.max_size_m))
                .attr("r", d => rScale(d.max_weight_t))
                .style("opacity", 1)
              )
            handleTooltip(circles);
          },

          update => update,

          exit => exit
            .call(exit => exit.transition(t)
              .attr("cy", d => innerHeight)
              .attr("r", 0)
              .style("opacity", 0)
              .remove()
            )
        );
    });
}

const drawTooltip = (data) => {
  innerChart.append("text")
    .attr("class", "tooltip")
    .attr("x", 100)
    .attr("y", 100)
    .attr("text-anchor", "middle")
    .style("opacity", 0)

  handleTooltip(innerChart.selectAll("circle"))
}

const handleTooltip = elements => elements
  .on("mouseenter", (e, d) => {
    d3.select(".tooltip")
      .text(d.common_name)
      .attr("x", e.target.getAttribute("cx"))
      .attr("y", e.target.getAttribute("cy") - e.target.getAttribute("r") - 10)
      .transition()
      .style("opacity", 1)
  })
  .on("mouseleave", (e, d) => {
    d3.select(".tooltip")
      .transition()
      .style("opacity", 0)
      .attr("x," - 100)
  })