/** Максимальнойе количество точек измерения потребляемой мощности */
export const POINTS_MAX = 6;
/** Свойства для закладки испытания потребляемой мощности*/
export const PowerProps = {
  NAME: "Power Consumption",
  TRACKED_STATE: 'test_power',
}
/** Свойства полей формы измерения потребляемой мощности */
export const POWER_DATANAMES = [
  {name: 'time',    label: 'Время испытания'},
  {name: 'rpm',     label: 'Скорость, мин−1'},
  {name: 'torque',  label: 'Момент, Н*м'},
  {name: 'power',   label: 'Мощность, кВт'},
  {name: 'temper',  label: 'Температура, °C'},
]
/** Пределы допуска для измерения потребляемой мощности */
export const AXIS_MAX = {
  time:   { domain: [0, 25],  tickCount: 6 },
  power:  { domain: [0, 0.6], tickCount: 7 },
  temper: { domain: [0, 120], tickCount: 7 },
}