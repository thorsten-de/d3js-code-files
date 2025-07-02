const Label = props => {
  return (
    <g className="label"
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }} >
      <text
        x={0}
        y={0}
        fill={props.color}
        textAnchor={props.textAnchor ?? "start"}
        alignmentBaseline={props.baseline ?? "middle"}
        style={{ fontWeight: "bold", fontSize: props.fontSize }}
      >
        {props.label}
      </text>
    </g >
  );
};

export default Label;