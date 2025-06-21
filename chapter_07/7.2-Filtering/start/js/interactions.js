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
    .on("click", (e, d) => {
      if (!d.isActive) {
        filters.forEach(filter => {
          filter.isActive = d.id === filter.id;// ? true : false
        });

        d3.selectAll(".filter")
          .classed("active", filter => filter.id === d.id)

        updateHistogram(d.id, data)
      }
    });



};


/****************************/
/*   Update the histogram   */
/****************************/
const updateHistogram = (selectedFilter, data) => {

  // Update the histogram here

};