import Circle from "../ChartComponents/Circle";
import Label from "../ChartComponents/Label";

const Badge = props => {
  return (
    <g className="label" transform={`translate(${props.x}, ${props.y})`}>##
      <Circle cx={0} cy={0} r={props.radius ?? 18}
        fill={props.fill ?? "white"}
        stroke={props.stroke ?? "black"}
        strokeWidth={props.strokeWidth ?? 3}
      />
      <Label label={props.label} color="#374f5e" textAnchor="middle" fontSize="12px" />
    </g>
  );
};

export default Badge;