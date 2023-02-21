import { setHardwareValues } from "./communication"


const STATES = {
  state: false,
  timer: undefined
}
export const setTestingPress = (tracked_state, status) => {
  status ? startTesting(tracked_state) : stopTesting(tracked_state)
}
const startTesting = (tracked_state) => {
  console.warn("Starting pressure testing");
  STATES.timer = setInterval(() => {
    const val = STATES.state = !STATES.state ? 0xff00 : 0x0000;
    setHardwareValues('digital', 7, 7, val).then(console.log);
  }, 1000);
}
const stopTesting = () => {
  clearInterval(STATES.timer);
}