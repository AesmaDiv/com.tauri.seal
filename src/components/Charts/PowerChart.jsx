import { useMemo } from 'react';
import { ComposedChart, XAxis, YAxis, CartesianGrid, Area } from 'recharts';
import { Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

import { nextDividingOn } from '../../configs/funcs_common';
import { POWER_STYLE } from './_styles';
import { COLORS } from '../../configs/cfg_application';
import { HEADERS_POWER } from '../../configs/cfg_localization';
import { AXIS_MAX } from '../../configs/cfg_power';


/** График потребляемой мощности */
export default function PowerConsumptionCharts(props) {
  /** точки */
  const points =useSelector(state => state.recordReducer.points.test_power);
  /** текущий типоразмер */
  const current_type = useSelector(state => state.recordReducer.current_type);
  /** пределы допуска, зависящие от типоразмера */
  const limits = useMemo(() => {
    return {
      power:  nextDividingOn(current_type.limit_pwr * 1.1, POWER_STYLE.props_axis.tickCount - 1),
      temper: nextDividingOn(current_type.limit_tmp * 1.1, POWER_STYLE.props_axis.tickCount - 1),
    }
  }, [current_type]);

  /** свойства */
  const params = {
    height: props?.for_protocol ? "29em" : "auto",
    animation: props?.for_protocol,
    animationDuration: props?.for_protocol ? 0 : 250,
    fill: props?.for_protocol ? 'black' : COLORS.font_app,
    color: '#88f888',
    domain: [0, limits.temper],
  }
  /** подписи */
  const headers = HEADERS_POWER[!!props.eng];

  console.log("%c --- CHART RENDER %o", 'color: #9999ff', headers.name);
  return (
    <ResponsiveContainer>
      <ComposedChart data={points} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
        <defs>
          <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={COLORS.chart_power_pwr} stopOpacity={0.5}/>
            <stop offset="95%" stopColor={COLORS.chart_power_pwr} stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTemper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={COLORS.chart_power_tmp} stopOpacity={0.5}/>
            <stop offset="95%" stopColor={COLORS.chart_power_tmp} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke='#777' strokeDasharray="5 5" />

        <Legend verticalAlign='top' layout='vertical' payload={[
          { type: 'line', color: COLORS.chart_power_pwr, value: headers.name},
          { type: 'line', color: COLORS.chart_power_tmp, value: headers.legend}
        ]} />

        <XAxis {...POWER_STYLE.props_axis} {...AXIS_MAX.time} allowDataOverflow
          dataKey="time" stroke={params.fill} label={{...POWER_STYLE.props_label_x,
          value: headers.axis_x,  fill: params.fill}}/>
        <YAxis {...POWER_STYLE.props_axis} {...AXIS_MAX.power} allowDataOverflow yAxisId="power"
          orientation="left" stroke={params.fill} label={{...POWER_STYLE.props_label_y, angle: -90,
          value: headers.axis_y0, position: 'insideLeft', fill: params.fill}}/>
        <YAxis {...POWER_STYLE.props_axis} {...AXIS_MAX.temper} allowDataOverflow yAxisId="temper"
          orientation="right" stroke={params.fill} label={{...POWER_STYLE.props_label_y, angle: 90,
          value: headers.axis_y1, position: 'insideRight', fill: params.fill}}/>

        <Area isAnimationActive={params.animation} animationDuration={params.animationDuration}
          dataKey="power" fillOpacity={1} fill="url(#colorPower)"
          stroke={COLORS.chart_power_pwr} yAxisId="power" />
        <Area isAnimationActive={params.animation} animationDuration={params.animationDuration}
          dataKey="temper" fillOpacity={1} fill="url(#colorTemper)"
          stroke={COLORS.chart_power_tmp} yAxisId="temper" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
