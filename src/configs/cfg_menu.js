/** Описание таблицы параметров испытаний */
export const TEST = {
  ROWS: [
    { name: "test.test_press", label: "Давление диафрагм"},
    { name: "test.test_power", label: "Потребляемая мощность"},
  ],
  COLUMNS: [
    { name: "duration",     label: "T, сек", parse_func: parseInt},
    { name: "pulling_rate", label: "Δt, мс", parse_func: parseInt},
    { name: "points_count", label: "N, тчк", parse_func: parseInt},
  ],
};
/** Описание таблицы параметров аналоговых слотов */
export const ANALOG = {
  ROWS: [
    { name: 'adam.analog.sys', label: 'Давление в системе' },
    { name: 'adam.analog.top', label: 'Давление верхней диаф' },
    { name: 'adam.analog.btm', label: 'Давление нижней диаф' },
    { name: 'adam.analog.rpm', label: 'Скорость' },
    { name: 'adam.analog.trq', label: 'Момент' },
    { name: 'adam.analog.tmp', label: 'Температура' },
  ],
  COLUMNS: [
    { name: 'slot',    label: 'слот',    parse_func: parseInt },
    { name: 'channel', label: 'канал',   parse_func: parseInt },
    { name: 'd_range', label: 'ц.диап.', parse_func: parseInt },
    { name: 'offset',  label: 'ц.смещ.', parse_func: parseInt },
    { name: 'v_range', label: 'з.диап.', parse_func: parseFloat },
    { name: 'coeff',   label: 'коэфф.' , parse_func: parseFloat },
  ],
};
/** Описание таблицы параметров дискретный слотов */
export const DIGITAL = {
  ROWS: [
    { name: 'adam.digital.lamp',   label: 'Маяк' },
    { name: 'adam.digital.engine', label: 'Главный привод' },
    { name: 'adam.digital.thrust', label: 'Клапан давления' },
    { name: 'adam.digital.valve',  label: 'Перепускной клапан' },
    { name: 'adam.digital.alarm',  label: 'Аварийный стоп' },
  ],
  COLUMNS: [
    { name: 'slot',    label: 'слот',   parse_func: parseInt},
    { name: 'channel', label: 'канал',  parse_func: parseInt},
  ],
};