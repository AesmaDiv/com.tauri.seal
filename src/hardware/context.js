import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createContainer } from 'react-tracked';

import { switchTesting } from '../redux/testingReducer';
import { addPoint } from '../redux/recordReducer';
import { getHardwareValues } from './communication';
import * as HWCFG from '../configs/cfg_hardware';


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
  const dispatch = useDispatch();
  /** состояние опроса оборудования */
  const is_reading  = useSelector(state => state.testingReducer.is_reading);
  /** текущее испытания */
  const active_test = useSelector(state => state.testingReducer.active_test);
  /** данные с оборудования */
  const [hw_values, setValues] = useState(INITIAL);
  
  // Получение данных с оборудования и обновление текущих значений */
  useEffect(() => {
    let timer = setInterval(() => {
      // если опрос активен - получаем данные с оборудования
      is_reading && getHardwareValues(active_test).then(adam_data => {
        // если данные корректны - обновляем текущие
        adam_data.analog && setValues(prev => ({...prev, ...adam_data.analog}));
      });
    }, HWCFG.PULLING_RATE[active_test]);
    return (() => clearInterval(timer));
  }, [is_reading, active_test]);

  // Добавление точки в массив активного теста
  useEffect(() => {
    // если нет активного испытания - выходим
    if (active_test === HWCFG.ACTIVE_TEST.none) return;
    // если время или кол-во точек превышено ..
    if ((hw_values[active_test].time < HWCFG.MAX_TEST_TIME[active_test]) &&
        (hw_values[active_test].length < HWCFG.MAX_POINTS[active_test])) { 
      // .. прекращаем испытание и выходим
      dispatch(switchTesting(HWCFG.ACTIVE_TEST.none));
      return;
    }
    // добавляем точку с указанным интервалом опроса
    if (!HWCFG.ADD_POINT_RATE.counter++) {
      dispatch(addPoint({ name: active_test, values: hw_values[active_test] }));
      HWCFG.ADD_POINT_RATE.counter = HWCFG.ADD_POINT_RATE[active_test];
    }
  }, [hw_values]);

  // console.log("+++ HARDWARE PROVIDER RENDER +++");
  return [hw_values]
}

export const {
  Provider: HardwareProvider,
  useTrackedState: useHardware,
  useUpdate: updateHardware,
} = createContainer(HardwareContext);
