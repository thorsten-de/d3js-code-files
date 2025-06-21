/*************************************/
/*  Create and populate the filters  */
/*************************************/
const populateFilters = (data) => {
  d3.select("#filters")
    .selectAll(".filter")
    .data(filters)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)



};


/****************************/
/*   Update the histogram   */
/****************************/
const updateHistogram = (selectedFilter, data) => {

  // Update the histogram here

};