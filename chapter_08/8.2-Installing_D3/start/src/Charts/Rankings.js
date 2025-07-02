import { useState } from 'react';

import RankingFilters from '../Interactions/RankingFilters';
import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import Curve from '../ChartComponents/Curve';
import * as d3 from 'd3';

const rankingFilters = [
  { id: "satisfaction", label: "Satisfaction" },
  { id: "interest", label: "Interest" },
  { id: "usage", label: "Usage" },
  { id: "awareness", label: "Awareness" },
];

const Rankings = props => {
  const [activeFilter, setActiveFilter] = useState("satisfaction");
  const width = 1000;
  const height = 542;
  const marginRight = 150;
  const marginLeft = 110;
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  console.log(props.data.years)

  const xScale = d3.scalePoint()
    .domain(props.data.years)
    .range([0, innerWidth]);
  console.log({ x: xScale(2016), innerWidth });

  const yScale = d3.scalePoint()
    .domain(d3.range(1, props.data.ids.length + 1))
    .range([0, innerHeight])

  return (
    <Card>
      <h2>Rankings</h2>
      <RankingFilters
        filters={rankingFilters}
        activeFilter={activeFilter}
      />
      <ChartContainer width={width} height={height} margin={props.margin}>
        {props.data.experience.map((framework, i) => (
          <g key={`curve-${framework.id}`}>
            <Curve
              data={framework[activeFilter]}
              xScale={xScale}
              yScale={yScale}
              xAccessor={d => d.year}
              yAccessor={d => d.rank}
              stroke={props.colorScale(framework.id)}
              strokeWidth={5}
            />
          </g>
        ))}
      </ChartContainer>
    </Card>
  )
};

export default Rankings;