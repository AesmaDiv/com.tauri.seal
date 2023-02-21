/** транслитерировать текст */
export function transliterate(text) {
  if (!text) return '';
  const rusLowercase = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
  const rusUppercase = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
  const engLowercase = ['a', 'b', 'v', 'g', 'd', 'e', 'yo', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'kh', 'ts', 'ch', 'sh', 'shch', "'", 'y', '"', 'e', 'yu', 'ya'];
  const engUppercase = ['A', 'B', 'V', 'G', 'D', 'E', 'Yo', 'Zh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'Kh', 'Ts', 'Ch', 'Sh', 'Shch', "'", 'Y', '"', 'E', 'Yu', 'Ya'];

  let index = 1;
  let result = text.split('').map(ch => {
    if (index = ~rusLowercase.indexOf(ch)) return engLowercase[-index - 1];
    if (index = ~rusUppercase.indexOf(ch)) return engUppercase[-index - 1];
    return ch;
  })

  return result;
}

export const HEADERS_PROTOCOL = {
  false: {
    title:        "ООО «ЭПУ СЕРВИС»",
    town:         "г.Когалым",
    title_info:   "Информация по гидрозащите :",
    producer:     "Производитель :",
    sealtype:     "Тип ГЗ :",
    serial:       "Заводской номер :",
    lmt_pwr:      "Предел мощности :",
    lmt_tmp:      "Предел температуры :",
    lmt_thr:      "Предел нагрузки :",
    connect:      "Шлицевое соединение :",
    rotation:     "Направление вращения :",
    exten_top:    "Вал, вылет верх :",
    exten_btm:    "Вал, вылет низ :",
    shaft_yeild:  "Вал, текучесть :",
    shaft_diam:   "Вал, диаметр :",
    runout_rad:   "Радиальное биение :",
    runout_end:   "Торцевое биение :",
    axial_play:   "Осевой люфт :",
    momentum:     "Момент проворота :",
    title_test:   "Информация по испытанию :",
    datetest:     "Дата испытания :",
    daterecv:     "Дата поступления :",
    customer:     "Заказчик :",
    ordernum:     "Наряд-заказ № :",
    field:        "Месторождение :",
    lease:        "Куст :",
    well:         "Скважина :",
    daysrun:      "Пробег, сут :",
    head:         "Состояние головки :",
    base:         "Состояние основания :",
    coupling:     "Наличие муфты :",
    pressure:     "Давление опрессовки, атм :",
    oil_color:    "Масло: цвет :",
    oil_water:    "Масло: вода :",
    oil_shavs:    "Масло: стружка :",
    oil_kvolt:    "Масло: диэл.проводимость :",
    title_result: "Результат испытаний :",
    note:         "Гидрозащита обкатывалась в течении 15 минут, при частоте вращения вала 2910 об/мин.",
    comments:     "Примечания :",
    operator:     "Испытатель :",
    foreman:      "Мастер :",

    table_axial:  "Осевая нагрузка, кгс/см²",
    table_power:  "Потребляемая мощность, кВт",
    table_temp:   "Температура, °C",
    table_time:   "Время",

    mms:          "мм",
    kgf:          "кгс/см²",
  },
  true: {
    title:        "LLC «ESP Service»",
    town:         "Kogalym",
    title_info:   "Seal section information :",
    producer:     "Manufacturer :",
    sealtype:     "Seal type :",
    serial:       "Factory number :",
    lmt_pwr:      "Power limit :",
    lmt_tmp:      "Temperature limit :",
    lmt_thr:      "Thrust limit :",
    connect:      "Connection type :",
    rotation:     "Rotation :",
    exten_top:    "Extention top :",
    exten_btm:    "Extension bottom :",
    shaft_yeild:  "Shaft yeild :",
    shaft_diam:   "Shaft diameter :",
    runout_rad:   "Radial runout :",
    runout_end:   "End runout :",
    axial_play:   "Axial play :",
    momentum:     "Crank moment :",
    title_test:   "Testing information: :",
    datetest:     "Date tested :",
    daterecv:     "Date received :",
    customer:     "Customer :",
    ordernum:     "Order № :",
    field:        "Field :",
    lease:        "Multiwell pad :",
    well:         "Well :",
    daysrun:      "Daysrun :",
    head:         "Head state :",
    base:         "Base state :",
    coupling:     "Coupling :",
    pressure:     "Crimping pressure, atm :",
    oil_color:    "Oil color :",
    oil_water:    "Water in oil :",
    oil_shavs:    "Shavings in oil :",
    oil_kvolt:    "Dielectric conductivity :",
    title_result: "Testing results :",
    note:         "Гидрозащита обкатывалась в течении 15 минут, при частоте вращения вала 2910 об/мин.",
    comments:     "Note: :",
    operator:     "Operator :",
    foreman:      "Foreman :",

    table_axial:  "Axial thrust, kgf/sm²",
    table_power:  "Power consump., kW",
    table_temp:   "Temperature, °C",
    table_time:   "Time",

    mms:          "mm",
    kgf:          "kgf/sm²",
  }
}

export const HEADERS_POWER = {
  false: {
    name:     'потребляемая мощность',
    legend:   'температура',
    axis_x:   'время, мин',
    axis_y0:  'мощность, кВт',
    axis_y1:  'температура, °C',
  },
  true: {
    name:     'power consumption',
    legend:   'temperature',
    axis_x:   'time, min',
    axis_y0:  'power, kW',
    axis_y1:  'temperature, °C',
  }
}

export const HEADERS_PRESS = {
  false: {
    top:      'верхняя диафрагма',
    btm:      'нижняя диафрагма',
    axis_x:   'время, сек',
    axis_y:   'давление, кгс/см²',
  },
  true: {
    top:      'top diaphragm',
    btm:      'bottom diaphragm',
    axis_x:   'time, sec',
    axis_y:   'pressure, kgf/sm²',
  }
}

export const COMBOS = {
  false: {
    presence: [
      { id: 1, name: 'Нет' },
      { id: 2, name: 'Есть'}
    ],
    state: [
      { id: 1, name: 'Новое' },
      { id: 2, name: 'Ремонтное' }
    ],
    connection: [
      { id: 1, name: 'Эвольвентное' },
      { id: 2, name: 'Прямобочное' }
    ],
    rotation: [
      { id: 1, name: 'Правое' },
      { id: 2, name: 'Левое' }
    ],
  },
  true: {
    presence: [
      { id: 1, name: 'None' },
      { id: 2, name: 'Present'}
    ],
    state: [
      { id: 1, name: 'New' },
      { id: 2, name: 'Repair' }
    ],
    connection: [
      { id: 1, name: 'Involate' },
      { id: 2, name: 'Straight side' }
    ],
    rotation: [
      { id: 1, name: 'Right' },
      { id: 2, name: 'Left' }
    ],
  },

}
