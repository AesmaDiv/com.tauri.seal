/** Максимальнойе количество точек измерения давления диафрагм */
export const POINTS_MAX = 30;
/** Свойства для закладки испытания давления диафрагм*/
export const PressProps = {
  NAME: "Pressure",
  TRACKED_STATE: 'test_press',
}
/** Свойства полей формы измерения давления диафрагм */
export const PRESS_DATANAMES = [
  { name: 'time',      label: 'Время испытания' },
  { name: 'press_sys', label: 'Давление в системе, кгс/м2' },
  { name: 'press_top', label: 'Давление верхней диафрагмы, кгс/м2' },
  { name: 'press_btm', label: 'Давление нижней диафрагмы, кгс/м2' }
];
/** Пределы допуска для измерения давления диафрагм */
export const PRESS_LIMITS = {
  top: [0.5, 2],
  btm: [1,   3],
}
const domain_top = PRESS_LIMITS.top[1] + 0.5
const domain_btm = PRESS_LIMITS.btm[1] + 0.5
/** Максимальные значения по оси Y */
export const AXIS_MAX = {
  time: { domain: [0, 180],         tickCount: 7 },
  top:  { domain: [0, domain_top],  tickCount: 1 + ~~(domain_top / 0.5) }, // ~~(A / B) - это
  btm:  { domain: [0, domain_btm],  tickCount: 1 + ~~(domain_btm / 0.5) }, // деление без остатка
};
/** Добавить информацию о пределах допуска */
export function addLimits(points) {
  return [{
    time: 0,
    press_top_limit_up: [PRESS_LIMITS.top[1], domain_top],
    press_top_limit_dw: [0, PRESS_LIMITS.top[0]],
    press_btm_limit_up: [PRESS_LIMITS.btm[1], domain_btm],
    press_btm_limit_dw: [0, PRESS_LIMITS.btm[0]],
  }, ...points, {
    time: AXIS_MAX.time.domain[1],
    press_top_limit_up: [PRESS_LIMITS.top[1], domain_top],
    press_top_limit_dw: [0, PRESS_LIMITS.top[0]],
    press_btm_limit_up: [PRESS_LIMITS.btm[1], domain_btm],
    press_btm_limit_dw: [0, PRESS_LIMITS.btm[0]],
  }];
}