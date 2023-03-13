import { useSelector } from 'react-redux';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Area, ReferenceArea, ReferenceDot } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { Stack } from '@mui/system';

import { useHardware } from '../../hardware/context';
import { AXIS_MAX, PRESS_LIMITS } from '../../configs/cfg_press';
import { PRESS_STYLE } from './_styles';
import { COLORS } from '../../configs/cfg_application';
import { HEADERS_PRESS } from '../../configs/cfg_localization';
import ReferenceCross from './ReferenceCross';


/** Контейнер графиков давления диафрагм */
export default function PressureCharts(props) {
  /** точки */
  const points = useSelector(state => state.recordReducer.points.test_press);

  /** свойства */
  const common = {
    width: '100%',
    height: props?.for_protocol ? '29em' : 'auto',
    animation: !props?.for_protocol,
    animationDuration: props?.for_protocol ? 0 : 250,
    fill: props?.for_protocol ? 'black' : COLORS.font_app,
  }

  console.log("%c --- CHARTS RENDER %c Pressure ---", 'color: #9999ff', 'color: green');
  return (
    <Stack width='100%' direction='column'>
      <PressChart {...common} name={'top'} eng={!!props.eng} x_key='time'
        data={points} y_key='press_top' axis_x={AXIS_MAX.time} axis_y={AXIS_MAX.top}
        color={COLORS.chart_press_top} stroke={common.fill}/>
      <PressChart {...common} name={'btm'} eng={!!props.eng} x_key='time'
        data={points} y_key='press_btm' axis_x={AXIS_MAX.time} axis_y={AXIS_MAX.btm}
        color={COLORS.chart_press_btm} stroke={common.fill}/>
    </Stack>
  );
}

/** График давления диафрагмы */
const PressChart = (props) => {
  const hw_values = useHardware();
  const headers = HEADERS_PRESS[!!props.eng];
  const chart_name = `press_${props.name}`;
  // параметры областей пределов допусков
  const area_xs = { x1: 0, x2: AXIS_MAX.time.domain[1] };
  const area_up = { y1: PRESS_LIMITS[props.name][1], y2: AXIS_MAX[props.name].domain[1] };
  const area_dn = { y1: 0, y2: PRESS_LIMITS[props.name][0] };
  /** текущие значения для маркера*/
  const current_value = {
    x: hw_values.test_press.time,
    y: hw_values.test_press[props.y_key]
  };

  console.log("%c --- CHART RENDER %o", 'color: #bbbbff', props?.name);
  return (
    <ResponsiveContainer>
      <ComposedChart
        data={props?.data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke='#777' strokeDasharray='5 5' />
        <Legend payload={[{ value: headers[props.name], type: 'line', color: props.color}]} verticalAlign='top'/>

        <XAxis {...PRESS_STYLE.props_axis} {...props.axis_x} dataKey={props.x_key} allowDataOverflow
          stroke={props.fill} label={{...PRESS_STYLE.props_label_x, value: headers.axis_x, fill: props.fill}}/>
        <YAxis {...PRESS_STYLE.props_axis} {...props.axis_y} allowDataOverflow
          stroke={props.fill} label={{...PRESS_STYLE.props_label_y, value: headers.axis_y, fill: props.fill}}/>

        <ReferenceArea {...area_xs} {...area_up} fill={COLORS.chart_press_lmt}/>
        <ReferenceArea {...area_xs} {...area_dn} fill={COLORS.chart_press_lmt}/>
        <ReferenceDot  {...current_value} r={20} shape={ReferenceCross} stroke={props.color}/>

        <Line dataKey={props.y_key} type='monotone' name={chart_name} isAnimationActive={props.animation}
          animationDuration={props.animationDuration} stroke={props.color} strokeWidth={2} dot={false}/>

      </ComposedChart>
    </ResponsiveContainer>
  );
}
