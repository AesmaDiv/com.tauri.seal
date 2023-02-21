/** Cтруктура данных о точках испытаниях */
export const POINTS_STRUCT = {
  /** давление диафрагм
   * - внутренняя структура:
   * {
   *  time: 0,
   *  press_top: 0,
   *  press_btm: 0,
   * }
   */
  test_press: [],
  /** потребляемая мощность
   * - внутренняя структура:
   * {
   *  time:   [],
   *  temper: [],
   *  power:  [],
   *  thrust: [],
   * }
   */
  test_power: [],
};
/** Cтруктура данных о типоразмере */
export const SEALTYPE = {
  id: '',
  limit_pwr: '',
  limit_tmp: '',
  limit_thr: ''
};