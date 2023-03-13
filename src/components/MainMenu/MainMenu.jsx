import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { Paper, Button, Modal } from "@mui/material";

import DataField from "../DataField/DataField";
import MenuTable from "./MenuTable";
import FileInput from "../FileInput/FileInput";
import { switchUpdated } from "../../redux/recordReducer";
import { updateConfig } from "../../functions/config";
import { extract, assign } from "../../functions/shared";
import { CONFIG } from "../../configs/cfg_application";
import { TEST, ANALOG, DIGITAL } from "../../configs/cfg_menu";


/** Основное меню приложения */
export default function MainMenu({open, onClose}) {
  const dispatch = useDispatch();

  /** обработчик сохранения настроек */
  function handleSubmit(event) {
    console.warn("Submiting form...");
    event.preventDefault();
    const settings = getParsedFormData(event.target);
    console.warn("New Settings %o", settings);
    updateConfig(settings).then(() => dispatch(switchUpdated()));
    onClose();
  }

  return (
    <Modal open={open} sx={{zIndex: 2}} onClick={e => e.stopPropagation()}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box component={Paper} position={'absolute'} top={'50%'} left={'50%'} padding={2}
        sx={{transform: 'translate(-50%, -50%)'}}>
        <form style={{display: 'flex', flexDirection: 'column', gap: '10px'}} onSubmit={handleSubmit}>
          <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px', rowGap: '10px' }}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <FileInput name='db.path' label='Путь к Базе Данных' defaultPath={extract(CONFIG, 'db.path')}/>
              <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <DataField
                  data={{ name: 'adam.ip', label: 'AdamTCP IP', requared: true }}
                  value={extract(CONFIG, 'adam.ip')}
                />
                <DataField
                  data={{ name: 'adam.pulling_rate', label: 'Период опроса, мс', requared: true }}
                  value={extract(CONFIG, 'adam.pulling_rate')}
                />
              </Box>
              <MenuTable title='Параметры испытания' table={TEST}/>
            </Box>
            <Box >
              <MenuTable title='Цифровые' table={DIGITAL}/>
            </Box>
          </Box>
          <MenuTable title='Аналоговые' table={ANALOG}/>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button variant='contained' size='small' color='warning' onClick={onClose}>Отмена</Button>
            <Button variant='contained' size='small' color='primary' type='submit'>Сохранить</Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

function getParsedFormData(form) {
  const data = new FormData(form);
  const names_n_funcs = getParseFuncs();
  let obj = {};
  for (let [k,v] of data) {
    const value = names_n_funcs[k] ? names_n_funcs[k](v) : v;
    const nodes = k.split('.');
    assign(obj, nodes, value);
  }
  return obj;
}
function getParseFuncs() {
  let result = {}
  Array.from([TEST, ANALOG, DIGITAL]).forEach(el =>
    el.ROWS.forEach(row =>
      el.COLUMNS.forEach(column =>
        result[`${row.name}.${column.name}`] = column.parse_func
  )));

  return result;
}