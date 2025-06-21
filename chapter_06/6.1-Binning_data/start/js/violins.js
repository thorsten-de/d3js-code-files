const drawViolinCharts = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = { top: 40, right: 20, bottom: 55, left: 60 };
  const width = 1000;
  const height = 400;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#violin")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner charts
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  /*********************************/
  /*    Calculate the quartiles    */
  /*********************************/
  const roles = [
    { id: "Designer" },
    { id: "Scientist" },
    { id: "Developer" },
    { id: "Analyst" },
    { id: "Leadership" },
  ];

  roles.forEach(role => {
    role["salaries"] = data
      .filter(d => d.role === role.id)
      .map(d => d.salary);

    const quartileScale = d3.scaleQuantile()
      .domain(role.salaries)
      .range([0, 1, 2, 3]);
    role["quartiles"] = quartileScale.quantiles();
    role["mean"] = d3.mean(role.salaries);
    role["bins"] = d3.bin()(role.salaries);
  });

  roles.sort((a, b) => a.mean - b.mean);
  console.log(roles);
};