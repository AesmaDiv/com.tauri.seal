import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { helperReadRecord, helperUpdateRecord, helperDeleteRecord, helperReadSealTypes} from "../database/DatabaseHelper";
import { getPointsFromRecord, serializePoints} from "../database/db_funcs";
import { POINTS_STRUCT, SEALTYPE } from "../database/db_models";
import { roundValue } from "../functions/shared";


const INITIAL = {
  /** флаг обновления записи */
  is_updated  : false,
  /** текущая запись */
  record      : {},
  /** текущие точки */
  points      : POINTS_STRUCT,
  /** список известных типоразмеров */
  sealtypes   : [],
  /** текущий типоразмер */
  current_type: SEALTYPE,
};
/** Функции добавления точек соответствующих испытаний */
const addPointFuncs = {
  /** добавить точку в массив измерений давления диафрагм */
  'test_press': (points, values) => [
    ...points,
    {
      time:      values.time,
      press_top: values.press_top,
      press_btm: values.press_btm,
    }
  ],
  /** добавить точку в массив измерений потребляемой мощности */
  'test_power': (points, values) => [
    ...points,
    {
      time:   roundValue(values.time / 60.0, 4),
      power:  values.power + 0.2,
      temper: values.temper + 23,
    }
  ],
};

/** Провайдер информации о записи */
const recordSlice = createSlice({
  name: 'record',
  initialState: INITIAL,
  reducers: {
    showMessage: (state, action) => {
      const {text, severity} = action.payload;
      state.message.text = text;
      state.message.severity = severity;
    },
    /** переключить флаг обновления записи */
    switchUpdated: (state, action) => {
      state.is_updated = !current(state).is_updated;
    },
    /** сбросить текущую запись */
    resetRecord: (state) => {
      // console.warn("recordReducer >> reseting record");
      state.record = INITIAL.record;
      state.points = INITIAL.points;
      state.current_type = INITIAL.current_type;
    },
    /** изменить текущий типоразмер */
    setCurrentType: (state, action) => {
      // console.warn("recordReducer >> setting current type", action.payload);
      const current_type = current(state).sealtypes.find(el => el.id === action.payload);
      state.current_type = current_type;
    },
    /** записать точки в БД */
    writePoints: (state, action) => {
      // console.warn("recordReducer >> updating points", state.record, action);
      const points_name = action.payload;
      state.record[points_name] = serializePoints(current(state).points[points_name]);
      helperUpdateRecord({
        id: current(state).record.id,
        test_press: current(state).record.test_press,
        test_power: current(state).record.test_power
      });
    },
    /** сбросить точки указанного испытания */
    resetPoints: (state, action) => {
      // console.warn("recordReducer >> reseting points", action.payload);
      state.points[action.payload] = INITIAL.points[action.payload];
    },
    /** обновить текущие значения для указанного испытания */
    addPoint: (state, action) => {
      // console.warn("recordReducer >> updating points",action, current(state).points);
      const {name, values} = action.payload;
      state.points[name] = addPointFuncs[name](current(state).points[name], values);
      // console.warn("Points %o", current(state).points);
    },
  },
  /** функции редюсера, автоматически вызываемые по завершению вызванных функций */
  extraReducers(builder) { builder
    .addCase(readDictionaries.fulfilled, (state, action) => {
      state.sealtypes = action.payload;
    })
    .addCase(readRecord.fulfilled, (state, action) => 
    {
      state.record = action.payload.record;
      state.points = action.payload.points;
      state.current_type = state.sealtypes.find(el => el.id === state.record.sealtype) || SEALTYPE;
    })
    .addCase(writeRecord.fulfilled, (state, action) => 
    {
      state.record = action.payload;
      state.is_updated = !state.is_updated;
    })
    .addCase(deleteRecord.fulfilled, (state, action) =>
    {
      state.record = INITIAL.record;
      state.points = INITIAL.points;
      state.is_updated = !state.is_updated;
    })
  }
});
/** прочитать таблицу типоразмеров */
export const readDictionaries = createAsyncThunk(
  'record/readDictionaries',
  async() => await helperReadSealTypes()
);
/** прочитать запись с указанным ID */
export const readRecord = createAsyncThunk(
  'record/readRecord',
  async(rec_id) => {
    console.warn('recordReducer >> reading record', rec_id);
    const record = await helperReadRecord(rec_id);
    const points = await getPointsFromRecord(record);

    return { record, points };
  }
);
/** сохранить запись в БД */
export const writeRecord = createAsyncThunk(
  'record/writeRecord',
  async(record) => { 
    console.warn('recordReducer >> writing record', record);
    const recid = await helperUpdateRecord(record);
    console.warn("writeRecord ID >>", recid);
    record.id = recid;

    return record;
  }
);
/** удалить запись с указанным ID  */
export const deleteRecord = createAsyncThunk(
  'record/deleteRecord',
  async(rec_id) => {
    console.warn('recordReducer >> deleting record', rec_id);
    const result = await helperDeleteRecord({id: rec_id});
    resetRecord();

    return result;
  }
);
export const {
  switchUpdated, switchPrinting,
  resetRecord, setCurrentType, 
  writePoints, resetPoints, addPoint, 
} = recordSlice.actions;
export default recordSlice.reducer;