import { useSelector } from 'react-redux';

import DataField from '../DataField/DataField';
import { RECORD_COLUMNS } from '../../database/db_tables';


/** Данные формы об объекте испытания */
export default function RecordInfo() {
  /** текущая запись */
  const record = useSelector(state => state.recordReducer.record);

  console.log("*** RECORD-INFO RENDER ***");
  return (
    RECORD_COLUMNS
      .filter(item => item.col > 0)
      .map(item =>
        <DataField
          required={item.required}
          key={item.name}
          data={item}
          value={record[item.name]}
          full={item.name === 'comments'}
          selectItems={item.items}
        />
      )
  )
}