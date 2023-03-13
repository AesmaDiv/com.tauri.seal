import { setHardwareValues } from "./communication"
import { switchTesting } from '../redux/testingReducer';
import { addPoint } from '../redux/recordReducer';
import { CONFIG } from "../configs/cfg_application";
import { ACTIVE_TEST, POINT_RATE } from '../configs/cfg_hardware';
import store from '../redux';


const STATES = {
  state: false,
  timer: undefined
};
export const setTestingPress = (tracked_state, status) => {
  status ? startTesting(tracked_state) : stopTesting(tracked_state)
};
const startTesting = (tracked_state) => {
  console.warn("Starting pressure testing");
  STATES.timer = setInterval(() => {
    const val = STATES.state = !STATES.state ? 0xff00 : 0x0000;
    setHardwareValues('digital', 7, 7, val).then(console.log);
  }, 1000);
};
const stopTesting = () => {
  clearInterval(STATES.timer);
};
/** Зафиксировать значения для испытания */
export function addTestPoint(active_test, values) {
  // если нет активного испытания - выходим
  if (active_test === ACTIVE_TEST.none) {
    POINT_RATE.counter = 0;
    return;
  }
  // если время или кол-во точек превышено ..
  if ((values.time   < CONFIG.test[active_test].duration) &&
      (values.length < CONFIG.test[active_test].points_count)) { 
    // .. прекращаем испытание и выходим
    store.dispatch(switchTesting(ACTIVE_TEST.none));
    return;
  }
  // добавляем точку с указанным интервалом опроса
  if (!(POINT_RATE.counter - POINT_RATE[active_test])) {
    console.warn("Point added on count %o with values %o", POINT_RATE.counter, values)
    store.dispatch(addPoint({ name: active_test, values: values }));
    POINT_RATE.counter = 0;
  } else POINT_RATE.counter++;
};