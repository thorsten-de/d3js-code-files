import { useRef, useEffect } from "react";
import * as d3 from "d3"

const Curve = props => {
  const lineGenerator = d3.line()
    .x(d => props.xScale(props.xAccessor(d)))
    .y(d => props.yScale(props.yAccessor(d)))
    .defined(d => props.yAccessor(d) !== null)
    .curve(d3.curveMonotoneX)

  const pathRef = useRef();

  useEffect(() => {
    const path = pathRef.current;
    d3.select(path)
      .transition()
      .duration(400)
      .ease(d3.easeCubicOut)
      .attr("d", lineGenerator(props.data));
  }, [props.data, lineGenerator])

  return <path ref={pathRef}
    fill="none" stroke={props.stroke ?? "black"} strokeWidth={props.strokeWidth ?? 2} />
};

export default Curve;