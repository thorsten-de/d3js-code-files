const resizeChart = () => {
  d3.selectAll("#line-chart text")
    .style("font-size", `${fontSizeScale(windowWidth)}px`);

  if ((windowWidth >= 700 && !isDesktopLayout) ||
    (windowWidth < 700 && isDesktopLayout)) {
    isDesktopLayout = !isDesktopLayout;

    leftAxis
      .ticks(isDesktopLayout ? 10 : 5);

    d3.select(".axis-y")
      .transition()
      .call(leftAxis);
  }
}

window.addEventListener("resize", () => {
  windowWidth = getWindowWidth();
  resizeChart();
});