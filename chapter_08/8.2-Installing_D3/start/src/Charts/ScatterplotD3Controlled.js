import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import Card from '../UI/Card';
import ChartContainer from '../ChartComponents/ChartContainer';

const ScatterplotD3Controlled = props => {
  const width = 300;
  const height = 245;
  const innerWidth = width - props.margin.left - props.margin.right;
  const innerHeight = height - props.margin.top - props.margin.bottom;

  const plotRef = useRef();

  return (
    <Card>
      <h2>Retention vs Usage</h2>
      <ChartContainer width={width} height={height} margin={props.margin}>
        <g ref={plotRef}></g>
      </ChartContainer>
    </Card>
  )
};

export default ScatterplotD3Controlled;