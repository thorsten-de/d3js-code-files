const drawBoxplot = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = { top: 40, right: 30, bottom: 25, left: 60 };
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const boxplotWidth = 60;
  const boxplotStrokeWidth = 3;


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

    const boxPlot = innerChart.append("g")
      .attr("stroke", slateGray)
      .attr("stroke-width", boxplotStrokeWidth)

    boxPlot.append("rect")
      .attr("x", xScale(gender) - boxplotWidth / 2)
      .attr("y", yScale(quartiles[2]))
      .attr("width", boxplotWidth)
      .attr("height", yScale(quartiles[0]) - yScale(quartiles[2]))
      .attr("fill", "transparent")

    const medianY = yScale(quartiles[1])
    boxPlot.append("line")
      .attr("x1", xScale(gender) - boxplotWidth / 2)
      .attr("x2", xScale(gender) + boxplotWidth / 2)
      .attr("y1", medianY)
      .attr("y2", medianY)
      .attr("stroke", gender === "Female" ? womenColor : menColor)
      .attr("stroke-width", 6)

    boxPlot.append("line")
      .attr("x1", xScale(gender))
      .attr("x2", xScale(gender))
      .attr("y1", yScale(max))
      .attr("y2", yScale(quartiles[2]))
    boxPlot.append("line")
      .attr("x1", xScale(gender) - boxplotWidth / 2)
      .attr("x2", xScale(gender) + boxplotWidth / 2)
      .attr("y1", yScale(max))
      .attr("y2", yScale(max))

    boxPlot.append("line")
      .attr("x1", xScale(gender))
      .attr("x2", xScale(gender))
      .attr("y1", yScale(quartiles[0]))
      .attr("y2", yScale(min))
    boxPlot.append("line")
      .attr("x1", xScale(gender) - boxplotWidth / 2)
      .attr("x2", xScale(gender) + boxplotWidth / 2)
      .attr("y1", yScale(min))
      .attr("y2", yScale(min))



  });
};