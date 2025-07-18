import "./Axis.css";

const AxisBottom = props => {
  const ticks = props.scale.ticks(props.innerWidth / 100);
  return (
    <g className="axis" transform={`translate(0, ${props.innerHeight})`}>
      <line x1={0} y1={0} x2={props.innerWidth} y2={0} />
      {ticks.map(tick => (
        <g key={tick} transform={`translate(${props.scale(tick)}, 0)`}>
          <line x1={0} y1={0} x2={0} y2={5} />
          <text x={0} y={20} textAnchor="middle">{tick}</text>
        </g>
      ))}
      {props.label &&
        <text className="axis-label" textAnchor="middle"
          transform={`translate(${props.innerWidth / 2} 45)`}>
          {props.label}
        </text>}
    </g>
  );
};

const AxisLeft = props => {
  const ticks = props.scale.ticks(props.innerHeight / 50);
  return (
    <g className="axis">
      <line x1={0} y1={0} x2={0} y2={props.innerHeight} />
      {ticks.map(tick => (
        <g key={tick} transform={`translate(0, ${props.scale(tick)})`}>
          <line x1={-5} y1={0} x2={0} y2={0} />
          <text x={-10} y={0} textAnchor="end" dominantBaseline="middle">{tick}</text>
        </g>
      ))}
      {props.label &&
        <text className="axis-label" textAnchor="middle"
          transform={`translate(-42 ${props.innerHeight / 2}) rotate(-90)`}>
          {props.label}
        </text>}
    </g>
  );
};

const AxisBandBottom = props => {
  return (
    <g className="axis" transform={`translate(0, ${props.innerHeight})`}>
      <line x1={0} y1={0} x2={props.innerWidth} y2={0} />
      {props.labels && props.labels.map(({ label: label, id: id }) =>
        <text className="axis-label" textAnchor="end" dominantBaseline="middle" key={id}
          transform={`translate(${props.scale(id) + props.scale.bandwidth() / 2}, 10 ) rotate(270)`}>
          {label}
        </text>
      )}
    </g>
  );
};

const Axis = props => {

  switch (props.type) {
    case "bottom":
      return AxisBottom(props);
    case "left":
      return AxisLeft(props);
    case "band":
      return AxisBandBottom(props);
    // no default
  };

};

export default Axis;