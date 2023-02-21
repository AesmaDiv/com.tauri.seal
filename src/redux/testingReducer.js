import { createSlice } from "@reduxjs/toolkit";
import { ACTIVE_TEST } from "../configs/cfg_hardware";

const INITIAL = {
  /** чтение с оборудования */
  is_reading: false,
  /** текущее испытание:
   *  - none -> нет
   *  - test_press -> измерение давления диафрагм
   *  - test_power -> измерение потребляемой мощности
   */
  active_test: ACTIVE_TEST.none,
};

/** Провайдет информации об состояниях испытания */
const testingSlice = createSlice({
  name: 'testing',
  initialState: INITIAL,
  reducers: {
    /** переключить состояние чтения с оборудования */
    switchReading: (state, action) => {
      state.is_reading = !!action.payload;
    },
    /** переключить состояние для указанного испытания */
    switchTesting: (state, action) => {
      state.active_test = {
        true:  action.payload,
        false: ACTIVE_TEST.none
      }[ACTIVE_TEST.hasOwnProperty(action.payload)];
    },
  },
})

export const { switchReading, switchTesting } = testingSlice.actions;
export default testingSlice.reducer;