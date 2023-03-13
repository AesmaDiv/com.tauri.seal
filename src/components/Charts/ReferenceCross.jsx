import { Cross } from "recharts";

export default function ReferenceCross(props) {
  const shift = props.r / 2;
  return (
    <Cross 
      x={props.cx} top={props.cy - shift} width={props.r}
      left={props.cx - shift} y={props.cy} height={props.r}
      stroke={props.stroke} strokeWidth={2}
    />
  );
}