import * as d3 from "d3"
const Curve = props => {
  const lineGenerator = d3.line()
    .x(d => props.xScale(props.xAccessor(d)))
    .y(d => props.yScale(props.yAccessor(d)))
    .defined(d => props.yAccessor(d) !== null)
    .curve(d3.curveMonotoneX)

  return <path d={lineGenerator(props.data)}
    fill="none" stroke={props.stroke ?? "black"} strokeWidth={props.strokeWidth ?? 2} />
};

export default Curve;