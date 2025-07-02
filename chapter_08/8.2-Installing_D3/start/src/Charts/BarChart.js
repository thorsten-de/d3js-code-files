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

  const ids = props.data.sort((f1, f2) => getAwareness(f2) - getAwareness(f1))
    .map(framework => framework.id)

  const xScale = d3.scaleBand()
    .domain(ids)
    .range([0, innerWidth])
    .padding(0.2)

  const labels = props.data.map(d => {
    return { id: d.id, label: d.name };
  })

  return (
    <Card>
      <h2>Awareness</h2>
      <ChartContainer width={width} height={height} margin={props.margin}>
        <Axis type="left" scale={yScale} innerHeight={innerHeight} innerWidth={innerWidth}
          label="Awareness %" />
        <Axis type="band" scale={xScale} innerWidth={innerWidth} innerHeight={innerHeight} labels={labels} />
        {props.data.map(framework => {
          console.log({ framework: framework.id, awareness: getAwareness(framework) })
          return <Rectangle key={`rectangle-${framework.id}`}
            x={xScale(framework.id)}
            y={yScale(getAwareness(framework))}
            width={xScale.bandwidth()}
            height={innerHeight - yScale(getAwareness(framework))}
            fill={props.colorScale(framework.id)}
          />
        })};

      </ChartContainer>
    </Card>
  )
};

export default BarChart;