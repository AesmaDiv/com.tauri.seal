import { readTextFile, writeTextFile, BaseDirectory, createDir } from '@tauri-apps/api/fs';
import { CONFIG } from '../configs/cfg_application';
import { ACTIVE_TEST, POINT_RATE } from '../configs/cfg_hardware';


/** Обновить настройки приложения */
export const updateConfig = async (new_settings) => {
  console.warn("Updating config")
  if (!!new_settings) {
    let json = JSON.stringify(new_settings, null, 2);
    await createDir('', { dir: BaseDirectory.AppConfig }).catch(console.warn);
    await writeTextFile('settings.cfg', json, { dir: BaseDirectory.AppConfig });
  }
  await readTextFile('settings.cfg', { dir: BaseDirectory.AppConfig })
  .then(res => { 
    let settings = JSON.parse(res);
    // обновления настроек
    CONFIG.db   = settings.db;
    CONFIG.adam = settings.adam;
    CONFIG.test = settings.test;
    // обновления периодов добавления точек
    POINT_RATE.test_press = calcPointRate(ACTIVE_TEST.test_press);
    POINT_RATE.test_power = calcPointRate(ACTIVE_TEST.test_power);
  })
  .catch(err => { 
    console.warn(`Error loading settings:\n\t${err}\nUsing default settings`);
    updateConfig(CONFIG);
  })

  console.warn("CONFIG: %o", CONFIG);
}
function calcPointRate(name) {
  const test = CONFIG.test[name];
  return test.duration / test.points_count * 1000 / test.pulling_rate;
}
(async() => await updateConfig())();