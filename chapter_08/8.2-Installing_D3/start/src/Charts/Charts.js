import { Fragment } from 'react';

import Rankings from './Rankings';
import ScatterplotD3Controlled from './ScatterplotD3Controlled';
import BarChart from './BarChart';
import * as d3 from 'd3';
import ScatterplotReactControlled from './ScatterplotReactControlled';


const Charts = props => {
  const margin = { top: 30, right: 10, bottom: 50, left: 60 }
  // Build a colorscale with a predefined color scheme
  const colorScale = d3.scaleOrdinal()
    .domain(props.data.ids)
    .range(d3.schemeTableau10);

  return (
    <Fragment>
      <h1>Front-end Frameworks</h1>
      <div className='row'>
        <div className='col-9'>
          <Rankings margin={margin} />
        </div>
        <div className='col-3'>
          <div className='row'>
            <div className='col-12'>
              {/* <ScatterplotD3Controlled margin={margin} data={props.data.experience} colorScale={colorScale} /> */}
              <ScatterplotReactControlled margin={margin} data={props.data.experience} colorScale={colorScale} />
            </div>
            <div className='col-12'>
              <BarChart margin={margin} />
            </div>
          </div>
        </div>
      </div>
      <div className="source">Data source and original rankings chart: <a href="https://2021.stateofjs.com/en-US/libraries/front-end-frameworks">The State of JS 2021: Front-end Frameworks</a></div>
    </Fragment>
  )
};

export default Charts;