import { readTextFile, writeTextFile, BaseDirectory, createDir } from '@tauri-apps/api/fs';
import { colors } from '@mui/material';


/** Палитра используемых цветов */
const COLORS = {
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
  chart_power_pwr: colors.green[200],
  chart_power_tmp: colors.green[400],
  chart_power_lmt: colors.green[100],
}
/** НАСТРОЙКИ ПРИЛОЖЕНИЯ */
const CONFIG = {
  db: {
    path: "",
  },
  adam: {
    ip: "0.0.0.0",
    sys: { slot: 0, channel: 1, d_range: 0xffff, v_range: 10, offset: 0, coeff: 1.1 },
    btm: { slot: 0, channel: 2, d_range: 0xffff, v_range: 10, offset: 0, coeff: 2.2 },
    top: { slot: 0, channel: 3, d_range: 0xffff, v_range: 10, offset: 0, coeff: 3.3 },
    rpm: { slot: 0, channel: 4, d_range: 0xffff, v_range: 10, offset: 0, coeff: 4.4 },
    trq: { slot: 0, channel: 5, d_range: 0xffff, v_range: 10, offset: 0, coeff: 5.5 },
    tmp: { slot: 0, channel: 6, d_range: 0xffff, v_range: 10, offset: 0, coeff: 6.6 },
  }
}

/** Обновить настройки приложения */
const updateConfig = async (new_settings) => {
  console.warn("Updating config")
  if (!!new_settings) {
    let json = JSON.stringify(new_settings, null, 2);
    await createDir('', { dir: BaseDirectory.AppConfig }).catch(console.warn);
    await writeTextFile('settings.cfg', json, { dir: BaseDirectory.AppConfig });
  }
  await readTextFile('settings.cfg', { dir: BaseDirectory.AppConfig })
  .then(res => { 
    let settings = JSON.parse(res);
    CONFIG.db = settings.db;
    CONFIG.adam = settings.adam;
    CONFIG.test = settings.test;
  })
  .catch(err => { 
    console.warn(`Error loading settings:\n\t${err}\nUsing default settings`);
    updateConfig(CONFIG);
  })

  console.warn("CONFIG: %o", CONFIG);
}


(async () => await updateConfig())();
// const updateConfig = () => {}
export { COLORS, CONFIG, updateConfig };
