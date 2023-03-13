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
/** период добавления точки (в циклах опроса) */
export const POINT_RATE = {
  // !!! ВНИМАНИЕ !!! НЕ ИЗМЕНЯТЬ ЗДЕСЬ !!!
  // значения расчитываются при обновлении настроек приложения
  // в функции updateConfig

  /** счётчик циклов */
  counter                   : 0,
  /** период добавления точки измерения давления диафгарм */
  [ACTIVE_TEST.test_press]  : 4,
  /** пероид добавления точки измерения потребляемой мощности */
  [ACTIVE_TEST.test_power]  : 240,
};
