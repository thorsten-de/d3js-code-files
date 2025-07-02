import { useState } from 'react';

import RankingFilters from '../Interactions/RankingFilters';
import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';
import Curve from '../ChartComponents/Curve';
import Label from '../ChartComponents/Label';
import * as d3 from 'd3';
import Badge from '../UI/Badge';

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
  const margin = { left: 110, top: props.margin.top, right: 150, bottom: props.margin.bottom }
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;


  const xScale = d3.scalePoint()
    .domain(props.data.years)
    .range([0, innerWidth]);

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
      <ChartContainer width={width} height={height} margin={margin}>
        {props.data.years.map(year => (
          <g key={`line-year-${year}`}
            className="axis"
            transform={`translate(${xScale(year)}, 0)`}
          >
            <line x1={0} y1={innerHeight} x2={0} y2={0} strokeDasharray={"6 4"} />
            <text x={0} y={innerHeight + 30} textAnchor="middle">
              {year}
            </text>

          </g>
        ))}
        {props.data.experience.map((framework, i) => {
          const filteredFrameworks = framework[activeFilter];
          console.log(filteredFrameworks)
          return (
            <g key={`curve-${framework.id}`}>
              <Curve
                data={filteredFrameworks}
                xScale={xScale}
                yScale={yScale}
                xAccessor={d => d.year}
                yAccessor={d => d.rank}
                stroke={props.colorScale(framework.id)}
                strokeWidth={5}
              />
              {filteredFrameworks.filter(data => data.rank !== null).map(data => (
                <Badge
                  x={xScale(data.year)}
                  y={yScale(data.rank)}
                  stroke={props.colorScale(framework.id)}
                  strokeWidth={4}
                  label={d3.format(".0f")(data.percentage_question) + "%"} />
              ))}
              {filteredFrameworks[0].rank &&
                <Label x={-25} y={yScale(filteredFrameworks[0].rank)}
                  color={props.colorScale(framework.id)}
                  label={framework.name}
                  textAnchor="end" />
              }
              <Label
                x={innerWidth + 25}
                y={yScale(filteredFrameworks[filteredFrameworks.length - 1].rank)}
                color={props.colorScale(framework.id)}
                label={framework.name}
                textAnchor="start"
              />
            </g>
          )
        })}
      </ChartContainer>
    </Card>
  )
};

export default Rankings;