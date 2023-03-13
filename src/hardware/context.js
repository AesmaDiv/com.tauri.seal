import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createContainer } from 'react-tracked';

import { updateHardwareValues } from './communication';
import { addTestPoint } from './testing_press';
import { CONFIG } from '../configs/cfg_application';


const INITIAL = {
  /** ДАВЛЕНИЕ ДИАФРАГМ */
  test_press: {
    time       : 0,  // время испытания
    press_sys  : 0,  // давление в системе
    press_top  : 0,  // давление верхней диафрагмы
    press_btm  : 0,  // давление нижней диафрагмы
  },
  /** ПОТРЕБЛЯЕМАЯ МОЩНОСТЬ */
  test_power: {
    time       : 0,  // время испытания
    rpm        : 0,  // скорость вращения
    torque     : 0,  // момент
    temper     : 0,  // температура
    power      : 0,  // мощность
  },
}
/** Провайдер данных с оборудования */
function HardwareContext() {
  /** состояние опроса оборудования */
  const is_reading  = useSelector(state => state.testingReducer.is_reading);
  /** текущее испытания */
  const active_test = useSelector(state => state.testingReducer.active_test);
  /** данные с оборудования */
  const [hw_values, setValues] = useState(INITIAL);
  /** период опроса (для выбранного испытания или по умолчанию) */
  const pulling_rate = CONFIG.test[active_test]?.pulling_rate || CONFIG.adam.pulling_rate;
  
  // Получение данных с оборудования и обновление текущих значений */
  useEffect(() => {
    // создаём таймер опроса
    let timer = setInterval(() => {
      updateHardwareValues(is_reading, active_test, setValues)
    }, pulling_rate);
    // очищаем таймер при выходе, чтоб не утекала память
    return (() => clearInterval(timer));
  }, [is_reading, active_test, pulling_rate]);

  // Добавление точки в массив активного теста
  useEffect(() => {
    addTestPoint(active_test, hw_values[active_test]);
  }, [hw_values]);

  // console.log("+++ HARDWARE PROVIDER RENDER +++");
  return [hw_values]
}

export const {
  Provider: HardwareProvider,
  useTrackedState: useHardware,
  useUpdate: updateHardware,
} = createContainer(HardwareContext);
