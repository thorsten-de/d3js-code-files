const Rectangle = props => {
  return (
    <rect
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      fill={props.fill}
      stroke={props.stroke ?? "none"}
      strokeWidth={props.strokeWidth ?? 0}
    />

  )
};

export default Rectangle;