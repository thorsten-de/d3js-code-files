const resizeChart = () => {
  d3.selectAll("#line-chart text")
    .style("font-size", `${fontSizeScale(windowWidth)}px`);
}

window.addEventListener("resize", () => {
  windowWidth = getWindowWidth();
  resizeChart();
});