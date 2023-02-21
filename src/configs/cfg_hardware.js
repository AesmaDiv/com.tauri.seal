/** Структура для хранения текущих значений с оборудования */
export const ADAM_DATA = {
  analog: {},
  digital: {},
};
/** Enum текущего испытания */
export const ACTIVE_TEST = Object.freeze({
  none: 0,
  test_press: 'test_press',
  test_power: 'test_power',
});
/** период опроса оборудования (в мс) */
export const PULLING_RATE = {
  [ACTIVE_TEST.none]        : 250,
  [ACTIVE_TEST.test_press]  : 250,
  [ACTIVE_TEST.test_power]  : 1000,
};
/** период добавления точки (в циклах опроса) */
export const ADD_POINT_RATE = {
  counter                   : 0,
  [ACTIVE_TEST.test_press]  : -4,
  [ACTIVE_TEST.test_power]  : -10,
};
/** максимальное время испытания (в сек) */
export const MAX_TEST_TIME = {
  [ACTIVE_TEST.test_press]  : 30,
  [ACTIVE_TEST.test_power]  : 25 * 60,
};
/** максимальное кол-во точек */
export const MAX_POINTS = {
  [ACTIVE_TEST.test_press]  : 250,
  [ACTIVE_TEST.test_power]  : 250,
};
