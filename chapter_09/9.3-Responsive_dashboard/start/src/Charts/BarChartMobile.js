import * as d3 from "d3";

import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import Axis from "../ChartComponents/Axis";
import Rectangle from "../ChartComponents/Rectangle";

const BarChartMobile = props => {
  const width = 300;
  const height = 455;
  const margin = { left: 100, top: props.margin.top, right: 50, bottom: props.margin.bottom };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const awarenessData = [];
  props.data.forEach(d => {
    const awareness = {
      id: d.id,
      name: d.name,
      awareness_percentage: d.awareness[d.awareness.length - 1].percentage_question
    };
    awarenessData.push(awareness);
  });
  awarenessData.sort((a, b) => b.awareness_percentage - a.awareness_percentage);

  const yScale = d3.scaleBand()
    .domain(awarenessData.map(d => d.name))
    .range([0, innerHeight])
    .padding(0.2);
  const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, innerWidth]);

  return (
    <Card>
      <h2>Awareness</h2>
      <ChartContainer
        width={width}
        height={height}
        margin={margin}
      >
        <Axis
          type="verticalBand"
          scale={yScale}
          ticks={awarenessData.map(d => d.name)}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
        />

        {awarenessData.map(framework => (
          <g transform={`translate(0, ${yScale(framework.name)})`} key={`rectangle-${framework.id}`}>

            <Rectangle
              y={0}
              x={0}
              height={yScale.bandwidth()}
              width={xScale(framework.awareness_percentage)}
              fill={props.colorScale(framework.id)}
            />
            <text
              x={xScale(framework.awareness_percentage) + 10}
              y={yScale.bandwidth() / 2}
              dominantBaseline="middle"
            >
              {d3.format(".0f")(framework.awareness_percentage)}%

            </text>
          </g>
        ))}
      </ChartContainer>
    </Card>
  )
};

export default BarChartMobile;