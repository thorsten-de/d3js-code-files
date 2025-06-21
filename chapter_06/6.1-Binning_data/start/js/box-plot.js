const drawBoxplot = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = { top: 40, right: 30, bottom: 25, left: 60 };
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#boxplot")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const genders = ["Female", "Male"];
  const xScale = d3.scalePoint()
    .domain(genders)
    .range([0, innerWidth])
    .padding(0.5);

  const maxSalary = d3.max(data, d => d.salary);
  const yScale = d3.scaleLinear()
    .domain([0, maxSalary])
    .range([innerHeight, 0])
    .nice();

  const bottomAxis = d3.axisBottom(xScale)
    .tickSizeOuter(0);

  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(bottomAxis);

  const leftAxis = d3.axisLeft(yScale);

  innerChart.append("g")
    .call(leftAxis);

  svg.append("text")
    .text("Yearly salary (USD)")
    .attr("x", 0)
    .attr("y", 20)

  genders.forEach(gender => {
    const salaries = data
      .filter(d => d.gender === gender)
      .map(d => d.salary);

    const quartileScale = d3.scaleQuantile()
      .domain(salaries)
      .range([0, 1, 2, 3]);

    const quartiles = quartileScale.quantiles();
    const median = d3.median(salaries)
    const mean = d3.mean(salaries)
    const [min, max] = d3.extent(salaries)

    console.log({ gender, quartiles, median, mean, min, max })




  });




};