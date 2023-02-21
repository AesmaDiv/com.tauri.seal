import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import SealTypeInfo from './RFSealTypeInfo';
import RecordInfo from './RFRecordInfo';
import { updateMessage } from '../MessageBox/MessageBox';
import { writeRecord, resetRecord } from '../../redux/recordReducer';
import { RECORD_COLUMNS, RECORD_COMBO_COLUMNS } from '../../database/db_tables';


/** Форма с информацией об объекте испытания */
export default function RecordForm() {
  const dispatch = useDispatch();
  const setMessage = updateMessage();

  const dispatchers = {
    write_record: (record_data) => dispatch(writeRecord(record_data)),
    reset_record: () => dispatch(resetRecord()),
    message_save: () => setMessage({text: 'Запись сохранена', type: 'success'})
  }

  /** обработчики */
  const handlers = {
    /** сброс текущей записи */
    Reset: (event) => {
      event.preventDefault();
      dispatchers.reset_record();
    },
    /** сохранение записи */
    Submit: (event) => {
      event.preventDefault();
      // получаем значения из полей формы
      const fields = RECORD_COLUMNS.map(item => item.name).concat('sealtype');
      const result = getFormData(event.target, fields);
      // парсим значения комбобоксов из строковых в числовые
      RECORD_COMBO_COLUMNS
        .map(item => item.name)
        .concat(['id', 'sealtype'])
        .forEach(name => result[name] = parseInt(result[name], 10));
      // сохраняем итог в БД
      dispatchers.write_record(result);
      dispatchers.message_save();
    }
  }

  const buttons_style = {width: '180px', mt: '1px', pb: 0}
  const buttons_div_style = {display: 'flex', justifyContent: 'space-between'}
  const form_div_style = {
    display: 'grid',
    height: 'fit-content',
    overflow: 'visible',
    paddingTop: '10px',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(11,1fr)',
    gridAutoRows: '36px',
    gridAutoFlow: 'column',
    columnGap: '20px',
    rowGap: '20px',
  }
  console.log("*** RECORD-FORM RENDER ***");
  return (
    <form className='RecordForm' onSubmit={handlers.Submit} onReset={handlers.Reset}>
      <div style={form_div_style}>
        <RecordInfo />
        <SealTypeInfo />
      </div>
      <div style={buttons_div_style}>
        <Button sx={{...buttons_style, gridColumn: 1}} variant='contained' size='small' key='btn-reset-testinfo' type='reset' color='warning'>Сброс</Button>
        <Button sx={{...buttons_style, gridColumn: 4}} variant='contained' size='small' key='btn-save-testinfo' type='submit' color='primary'>Сохранить</Button>
      </div>
    </form>
  );
};

/** Получить данные полей формы */
function getFormData(form, fields) {
  const data = new FormData(form);
  return fields.reduce((acc, val) => {
    acc[val] = data.get(val);
    return acc;
  }, {})
}