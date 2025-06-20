const drawPyramid = (data) => {

  /*******************************/
  /*    Declare the constants    */
  /*******************************/
  const margin = { top: 40, right: 30, bottom: 40, left: 60 };
  const width = 555;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  /*******************************/
  /*    Append the containers    */
  /*******************************/
  // Append the SVG container
  const svg = d3.select("#pyramid")
    .append("svg")
    .attr("viewBox", `0, 0, ${width}, ${height}`);

  // Append the group that will contain the inner chart
  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const binGenerator = d3.bin()
    .value(d => d.salary)
  const completeData = binGenerator(data);

  const minSalary = completeData[0].x0;
  const maxSalary = completeData[completeData.length - 1].x1;

  const yScale = d3.scaleLinear()
    .domain([minSalary, maxSalary])
    .range([innerHeight, 0]);

  const groups = d3.group(data, d => d.gender);
  const charts = [{
    data: groups.get("Male"),
    color: menColor,
    domain: [0, 15],
    range: [innerWidth / 2, innerWidth],
    tickValues: [5, 10, 15],
    class: "male"
  },
  {
    data: groups.get("Female"),
    color: womenColor,
    domain: [15, 0],
    range: [0, innerWidth / 2],
    tickValues: [15, 10, 5, 0],
    class: "female"
  }
  ]

  charts.forEach(chart => {
    const bins = binGenerator(chart.data)
    const middle = innerWidth / 2;

    const xScale = d3.scaleLinear()
      .domain(chart.domain)
      .range(chart.range)

    const orientation = chart.class === "female" ? -1 : 1;
    const xWidth = d => xScale(d.length / data.length * 100)
    const xPos = chart.class === "female" ? xWidth : middle
    console.log(bins)

    innerChart
      .append("g")
      .selectAll(`rect-${chart.class}`)
      .data(bins)
      .join("rect")
      .attr("class", `rect-${chart.class}`)
      .attr("x", xPos)
      .attr("y", d => yScale(d.x1))
      .attr("width", d => orientation * (xWidth(d) - middle))
      .attr("height", d => yScale(d.x0) - yScale(d.x1))
      .attr("fill", chart.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)

    const bottomAxis = d3.axisBottom(xScale)
      .tickValues(chart.tickValues)
      .tickSizeOuter(0)

    innerChart.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

    svg.append("text")
      .text("Percent")
      .attr("text-anchor", "middle")
      .attr("x", margin.left + middle)
      .attr("y", height - 5);

    const leftAxis = d3.axisLeft(yScale);
    innerChart.append("g")
      .call(leftAxis);

    svg.append("text")
      .text("Yearly salary (USD)")
      .attr("dominant-baseline", "hanging")
      .attr("x", 5)
  });






};