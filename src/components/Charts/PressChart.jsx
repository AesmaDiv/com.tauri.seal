import { useSelector } from 'react-redux';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { Stack } from '@mui/system';

import { addLimits, AXIS_MAX } from '../../configs/cfg_press';
import { PRESS_STYLE } from './_styles';
import { COLORS } from '../../configs/cfg_application';
import { HEADERS_PRESS } from '../../configs/cfg_localization';


/** Контейнер графиков давления диафрагм */
export default function PressureCharts(props) {
  /** точки */
  const points = useSelector(state => state.recordReducer.points.test_press);
  /** точки с добавлением пределов допусков */
  const points_with_limits = addLimits(points);

  /** свойства */
  const common = {
    width: "100%",
    height: props?.for_protocol ? "29em" : "auto",
    animation: !props?.for_protocol,
    animationDuration: props?.for_protocol ? 0 : 250,
    fill: props?.for_protocol ? "black" : COLORS.font_app,
  }
  const headers = HEADERS_PRESS[!!props.eng]

  console.log("%c --- CHARTS RENDER %c Pressure ---", 'color: #9999ff', 'color: green');
  return (
    <Stack width="100%" direction="column">
      <PressChart {...common} name={headers.top} eng={!!props.eng} x_key="time"
        data={points_with_limits} y_key="press_top" axis_x={AXIS_MAX.time} axis_y={AXIS_MAX.top}
        color={COLORS.chart_press_top} stroke={common.fill}/>
      <PressChart {...common} name={headers.btm} eng={!!props.eng} x_key="time"
        data={points_with_limits} y_key="press_btm" axis_x={AXIS_MAX.time} axis_y={AXIS_MAX.btm}
        color={COLORS.chart_press_btm} stroke={common.fill}/>
    </Stack>
  );
}

/** График давления диафрагмы */
const PressChart = (props) => {
  const headers = HEADERS_PRESS[!!props.eng]
  console.log("%c --- CHART RENDER %o", 'color: #bbbbff', props?.name);
  return (
    <ResponsiveContainer>
      <ComposedChart
        data={props?.data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />
        <Legend payload={[{ value: props.name, type: 'line', color: props.color}]} verticalAlign='top'/>

        <XAxis {...PRESS_STYLE.props_axis} {...props.axis_x} dataKey={props.x_key} allowDataOverflow
          stroke={props.fill} label={{...PRESS_STYLE.props_label_x, value: headers.axis_x, fill: props.fill}}/>
        <YAxis {...PRESS_STYLE.props_axis} {...props.axis_y} allowDataOverflow
          stroke={props.fill} label={{...PRESS_STYLE.props_label_y, value: headers.axis_y, fill: props.fill}}/>

        <Area dataKey={`${props.y_key}_limit_up`} {...PRESS_STYLE.props_area_limit} fill={COLORS.chart_press_lmt}/>

        <Line dataKey={props.y_key} type="monotone" name={props.name} isAnimationActive={props.animation}
          animationDuration={props.animationDuration} stroke={props.color} strokeWidth={2} dot={false}/>

        <Area dataKey={`${props.y_key}_limit_dw`} {...PRESS_STYLE.props_area_limit} fill={COLORS.chart_press_lmt}/>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
