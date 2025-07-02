import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import Rectangle from '../ChartComponents/Rectangle';
import * as d3 from 'd3';
import Axis from '../ChartComponents/Axis';

const xScale = d3.scaleBand()
  .domain()

const BarChart = props => {
  const width = 300;
  const height = 245;
  props.margin.bottom = 85;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([innerHeight, 0])

  const getAwareness = framework =>
    d3.max(framework.awareness, d => d.percentage_question)

  const awarenessData = props.data.map(d => {
    return { id: d.id, label: d.name, awareness: getAwareness(d) };
  })
  awarenessData.sort((f1, f2) => f2.awareness - f1.awareness)

  const xScale = d3.scaleBand()
    .domain(awarenessData.map(d => d.id))
    .range([0, innerWidth])
    .padding(0.2)

  return (
    <Card>
      <h2>Awareness</h2>
      <ChartContainer width={width} height={height} margin={props.margin}>
        <Axis type="left" scale={yScale} innerHeight={innerHeight} innerWidth={innerWidth}
          label="Awareness %" />
        <Axis type="band" scale={xScale} innerWidth={innerWidth} innerHeight={innerHeight} labels={awarenessData} />
        {awarenessData.map(framework => {
          return <Rectangle key={`rectangle-${framework.id}`}
            x={xScale(framework.id)}
            y={yScale(framework.awareness)}
            width={xScale.bandwidth()}
            height={innerHeight - yScale(framework.awareness)}
            fill={props.colorScale(framework.id)}
          />
        })};

      </ChartContainer>
    </Card>
  )
};

export default BarChart;