import { useSelector, useDispatch } from 'react-redux';

import DataField from '../DataField/DataField';
import { setCurrentType } from '../../redux/recordReducer';
import { SEALTYPE_COLUMNS } from "../../database/db_tables"

/** Данные формы об типоразмере ГЗ */
export default function SealTypeInfo(){
  const dispatch = useDispatch();
  /** список всех известных типоразмеров */
  const sealtypes = useSelector((state) => state.recordReducer.sealtypes);
  /** текущий типоразмер */
  const current_type = useSelector((state) => state.recordReducer.current_type);

  console.log("*** SEALTYPE-INFO RENDER ***");
  return (
    SEALTYPE_COLUMNS.map(item =>
      <DataField
        required={item.required}
        key={item.name}
        data={item}
        value={current_type[item.name === 'sealtype' ? 'id' : item.name]}
        selectItems={item.name === 'sealtype' ? sealtypes : []}
        onValueChange={value => item.name === 'sealtype' && dispatch(setCurrentType(value))}
      />
    )
  )
}