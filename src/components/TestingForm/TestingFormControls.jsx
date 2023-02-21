import { useSelector, useDispatch } from "react-redux";
import { Stack } from "@mui/system";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

import DataField from "../DataField/DataField";
import { updateMessage } from "../MessageBox/MessageBox";
import { useHardware } from "../../hardware/context";
import { switchTesting } from "../../redux/testingReducer";
import { ACTIVE_TEST } from "../../configs/cfg_hardware";
import { resetPoints, addPoint, writePoints } from "../../redux/recordReducer";

import { STYLES as CLS } from "./_styles";


/** Поля и кнопки для управления испытанием
 * @param tracked_state имя отслеживаемого флага испытания
 * @param data_fields список параметров для полей отображения значений вида
 * - [.. ,{name: 'имя', label: 'заголовок'}, ..]
 */
export default function TestingFormControls({name, tracked_state, data_fields}) {
  const dispatch = useDispatch();
  const setMessage = updateMessage();
  /** данные с оборудования */
  const hw_values = useHardware();
  /** состояние чтения с оборудования */
  const is_reading = useSelector(state => state.testingReducer.is_reading);
  /** состояние испытания */
  const active_test = useSelector(state => state.testingReducer.active_test);
  const is_testing = active_test === ACTIVE_TEST[tracked_state];

  const handlers = {
    /** переключения состояния испытания */
    switchTestingMode: (_, new_state) => {
      if (new_state === null) return;
      if (is_reading) {
        switchTest(tracked_state, new_state, hw_values, dispatch);
      } else {
        setMessage({
          text: 'Не запущен опрос Adam 5000 TCP',
          severity: 'warning',
        });
      }
    },
    /** сохранение результатов испытания */
    Save: () => {
      setMessage({
        text: is_testing ? 'Не допускается во время измерения' : 'Результаты измерения сохранены',
        severity: is_testing ? 'warning' : 'success',
      });
      is_testing || dispatch(writePoints(tracked_state));
    }
  }

  const color = name === "Pressure" ? "green" : "red";
  // console.log(`%c --- CONTROLS RENDER %c ${name} ---`, 'color: #7777ff', `color: ${color}`);
  return (
    <Stack direction="column" sx={CLS.controls}>
      <Stack direction="column" sx={CLS.controls_data}>
        {data_fields.map(item => {
          let value = hw_values[tracked_state][item.name]
          value = item.name === 'time' ?
            new Date(value * 1000).toJSON().slice(11,23) :
            value.toString()
          return <DataField key={item.name} data={item}
            value={value}
            inputProps={{
              InputProps: { style: { color: '#ffc653'}, readOnly: true },
              InputLabelProps: { style: { color: 'white' }, shrink: true }
            }}/>
          }
        )}
      </Stack>
      <Stack sx={CLS.controls_btns}>
        <ToggleButtonGroup exclusive sx={CLS.controls_test}
          value={is_testing} onChange={handlers.switchTestingMode}>

          <ToggleButton sx={[CLS.btns, CLS.btn_start]} value={true}
            variant='contained' size='small' /*color="error"*/>
              СТАРТ
          </ToggleButton>
          <ToggleButton sx={[CLS.btns, CLS.btn_stop]} value={false}
            variant='contained' size='small' /*color="info"*/>
              СТОП
          </ToggleButton>

        </ToggleButtonGroup>
        <Button sx={CLS.btn_save} type='submit' onClick={handlers.Save}
          variant='contained' size='small'>
            Сохранить
          </Button>
      </Stack>
    </Stack>
  );
}

function switchTest(tracked_state, new_state, hw_values, dispatch) {
  const active_test = new_state ? ACTIVE_TEST[tracked_state] : ACTIVE_TEST.none;
  // старт испытания
  new_state &&
  dispatch(resetPoints(tracked_state)) &&
  dispatch(addPoint({ name: active_test, values: hw_values[active_test] }));
  let timeout = setTimeout(() => {
    dispatch(switchTesting(active_test))
  }, 500)

  return (() => clearTimeout(timeout))
}