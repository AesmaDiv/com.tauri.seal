import { colors } from '@mui/material';


/** Палитра используемых цветов */
export const COLORS = {
  primary: colors.blue[700],
  // background_app: colors.grey[900],
  // background_form: colors.grey[800],
  background_app: colors.blue[100],
  background_form: colors.blue[50],
  font_app: colors.grey[900],
  font_input: colors.amber[600],
  background_menu: colors.blue[800],
  chart_press_top: colors.blue[400],
  chart_press_btm: colors.green[400],
  chart_press_lmt: colors.yellow[200],
  chart_power_pwr: colors.red[400],
  chart_power_tmp: colors.green[800],
  chart_power_lmt: colors.green[100],
}
/** НАСТРОЙКИ ПРИЛОЖЕНИЯ */
export const CONFIG = {
  db: {
    path: ""
  },
  test: {
    test_press: { duration: 180,  pulling_rate: 250 , points_count: 10 },
    test_power: { duration: 1500, pulling_rate: 1000, points_count: 10 }
  },
  adam: {
    ip: "0.0.0.0",
    pulling_rate: 250,
    digital: {
      lamp:   { slot: 1, channel: 0 },
      engine: { slot: 1, channel: 1 },
      thrust: { slot: 1, channel: 2 },
      valve:  { slot: 1, channel: 3 },
      alarm:  { slot: 1, channel: 4 },
    },
    analog: {
      sys: { slot: 0, channel: 1, d_range: 0xffff, offset: 0, v_range: 10, coeff: 1.1 },
      btm: { slot: 0, channel: 2, d_range: 0xffff, offset: 0, v_range: 10, coeff: 2.2 },
      top: { slot: 0, channel: 3, d_range: 0xffff, offset: 0, v_range: 10, coeff: 3.3 },
      rpm: { slot: 0, channel: 4, d_range: 0xffff, offset: 0, v_range: 10, coeff: 4.4 },
      trq: { slot: 0, channel: 5, d_range: 0xffff, offset: 0, v_range: 10, coeff: 5.5 },
      tmp: { slot: 0, channel: 6, d_range: 0xffff, offset: 0, v_range: 10, coeff: 6.6 },
    }
  },
}