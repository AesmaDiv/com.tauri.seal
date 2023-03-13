import { invoke } from "@tauri-apps/api";
import { roundValue } from "../functions/shared";
import { CONFIG } from "../configs/cfg_application";
import { ADAM_DATA, ACTIVE_TEST } from "../configs/cfg_hardware";


/** Обновить данные с оборудования */
export function updateHardwareValues(is_reading, active_test, setValues) {
  // если опрос активен - получаем данные с оборудования
  is_reading && readAdam(active_test)
  .then(adam_data => {
    // если данные корректны - обновляем текущие
    adam_data.analog && setValues(prev => ({...prev, ...adam_data.analog}));
  });
}
/** Получить все значения с ADAM для текущего испытания */
async function readAdam(active_test) {
  const result = await invoke('read_adam', {address: CONFIG.adam.ip});
  ADAM_DATA.analog  = parseAnalog(result.analog, active_test);
  ADAM_DATA.digital = parseDigital(result.digital);

  return ADAM_DATA;
}
/** Установить значение канала в ADAM */
export async function setHardwareValues(slottype, slot, channel, value) {
  const params = {
    address:    CONFIG.adam.ip,
    slottype:   slottype,
    data: {
      slot:     slot,
      channel:  channel,
      value:    value,
    }
  }

  return { result: await invoke('write_adam', params), params};
}
/** Чтение из значения аналогового входа, соответствующего конфигу */
function fromAnalog(config, analog, decimal) {
  const { slot, channel, d_range, v_range, offset, coeff } = config;
  const value = (analog?.slot[slot][channel] - offset) * coeff * v_range / d_range;

  return roundValue( value, decimal);
}
/** Объект для контроля времени испытания */
const TIME = {
  start: Date.now(),
  current: 0
}
/** Разбор значений с аналоговых каналов */
function parseAnalog (analog, active_test) {
  // фиксация времени начала испытания
  if (active_test === ACTIVE_TEST.none) TIME.start = Date.now();
  // расчёт времени, прошедшего с начала испытания в СЕКУНДАХ
  TIME.current = Date.now();
  const elapsed = roundValue((TIME.current - TIME.start) * 0.001, 4);
  let result = {
    test_press: {
      time:       elapsed,
      press_sys:  fromAnalog(CONFIG.adam.analog.sys, analog, 4),
      press_top:  fromAnalog(CONFIG.adam.analog.top, analog, 4),
      press_btm:  fromAnalog(CONFIG.adam.analog.btm, analog, 4),
    },
    test_power: {
      time:       elapsed,
      rpm:        fromAnalog(CONFIG.adam.analog.rpm, analog, 4),
      torque:     fromAnalog(CONFIG.adam.analog.trq, analog, 4),
      temper:     fromAnalog(CONFIG.adam.analog.tmp, analog, 4),
    },
  }
  result.test_power.power = roundValue(result.test_power.torque * result.test_power.rpm / 63.025, 8);

  return result;
};
/** Разбор значений с цифровых каналов */
function parseDigital(digital) {
  return !!digital ? {
    // каждый слот содержит число, представляющее состояние каналов
    // как бит в этом числе, то есть:
    //   3 = 0b00000011 -> включены каналы 0 и 1
    //  10 = 0b00001010 -> включены каналы 1 и 3
    // 129 = 0b10000001 -> включены каналы 0 и 7
    // поэтому чтобы получить состояния конкретных каналов,
    // нужно провести побитовое И значения слота с 2 ** номер_канала
    slot: digital?.slot
      .map(channel_value => {
        // отбрасываем лишние 8 бит из 16-ти
        let cv = channel_value >> 8;
        return [0,1,2,3,4,5,6,7]
        .map(pow => 2 ** pow)
        .map(state => (state & cv) !== 0)
      }
    )
  } : digital;
}