import { COMBOS } from "../configs/cfg_localization";


/** Поля поиска для фильтрации списка записей */
export const RECORD_SEARCH_COLUMNS = [
  { col: 1, row: 1, name: "datetest", required: false, label: "Дата испытания"},
  { col: 1, row: 3, name: "customer", required: true,  label: "Заказчик"},
  { col: 1, row: 4, name: "ordernum", required: true,  label: "Наряд-заказ" },
  { col: 1, row: 7, name: "serial",   required: true,  label: "Заводской номер" },
]
/** Поля информации о типоразмере, для отображения в форме */
export const SEALTYPE_COLUMNS = [
  { col: 1, row: 6, name: "sealtype",  required: true,  label: "Тип ГЗ"},
  { col: 1, row: 8, name: "producer",  required: false, label: "Производитель" },
  { col: 2, row: 6, name: "limit_pwr", required: false, label: "Предел мощности"},
  { col: 2, row: 7, name: "limit_tmp", required: false, label: "Предел температуры"},
  { col: 2, row: 8, name: "limit_thr", required: false, label: "Предел нагрузки"},
]
/** Дополнительные поля со списками, для отображения в форме */
export const RECORD_COMBO_COLUMNS = [
  { col: 1, row: 9, name: "shaft_connection", required: false, label: "Шлицевое соединение",  items: COMBOS[false].connection},
  { col: 2, row: 9, name: "shaft_rotation",   required: false, label: "Направление вращения", items: COMBOS[false].rotation},
  { col: 3, row: 1, name: "head",             required: false, label: "Состояние головки",    items: COMBOS[false].state},
  { col: 3, row: 2, name: "base",             required: false, label: "Состояние основания",  items: COMBOS[false].state},
  { col: 3, row: 3, name: "coupling",         required: false, label: "Наличие муфты",        items: COMBOS[false].presence},
  { col: 4, row: 2, name: "oil_water",        required: false, label: "Масло, вода",          items: COMBOS[false].presence},
  { col: 4, row: 3, name: "oil_shavs",        required: false, label: "Масло, стружка",       items: COMBOS[false].presence},
]
/** Поля полной информации о записи, для отображения в форме */
export const RECORD_COLUMNS = [
  ...RECORD_SEARCH_COLUMNS,
  ...RECORD_COMBO_COLUMNS,
  { col: 1, row: 1,  name: "id",          hidden: true,    label: "Номер записи"},
  { col: 1, row: 2,  name: "daterecv",    required: false, label: "Дата поступления"},
  { col: 2, row: 1,  name: "field",       required: false, label: "Месторождение" },
  { col: 2, row: 2,  name: "lease",       required: false, label: "Куст"},
  { col: 2, row: 3,  name: "well",        required: false, label: "Скважина"},
  { col: 2, row: 4,  name: "daysrun",     required: false, label: "Суточный пробег" },
  { col: 3, row: 4,  name: "pressure",    required: false, label: "Давление опрессовки"},
  { col: 4, row: 1,  name: "oil_color",   required: false, label: "Масло, цвет" },
  { col: 4, row: 4,  name: "oil_kvolt",   required: false, label: "Масло, диэл.прочность" },

  { col: 3, row: 6,  name: "runout_rad",  required: false, label: "Радиальное биение" },
  { col: 3, row: 7,  name: "runout_end",  required: false, label: "Торцевое биение"},
  { col: 3, row: 8,  name: "axial_play",  required: false, label: "Осевой люфт"},
  { col: 3, row: 9,  name: "momentum",    required: false, label: "Момент проворота"},
  { col: 4, row: 6,  name: "exten_top",   required: false, label: "Вал, вылет верх" },
  { col: 4, row: 7,  name: "exten_btm",   required: false, label: "Вал, вылет низ"},
  { col: 4, row: 8,  name: "shaft_yield", required: false, label: "Вал, текучесть"},
  { col: 4, row: 9,  name: "shaft_diam",  required: false, label: "Вал, диаметр"},
  { col: 0, row: 0,  name: "test_press",  required: false, label: "Давление диафрагм"},
  { col: 0, row: 0,  name: "test_power",  required: false, label: "Потребляемая мощность"},
  { col: 0, row: 0,  name: "rawdata",     required: false, label: "Данные испытания"},
  { col: 1, row: 10, name: "comments",    required: false, label: "Примечания"},
];
/** Структура словаря для комбобоксов */
export const DICT_COLUMNS = {
  id: "Номер",
  name: "Имя",
};
