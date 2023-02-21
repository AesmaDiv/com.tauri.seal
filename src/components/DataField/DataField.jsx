import { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";


/** Компонент универсального поля данных */
export default function DataField(props) {
  /** текущее значение поля */
  const [value, setValue] = useState('');

  /** установка значения */
  useEffect(() => setValue(props.value || ''), [props.value])

  /** обработчик изменения значений */
  function handleChange(event) {
    let new_value = event.target.value;
    setValue(new_value);
    props.onValueChange && props.onValueChange(new_value);
  }

  /** элементы выпадающего списка */
  const cobmoItems = props.selectItems?.map(item => (
    <MenuItem key={item.id} value={item.id}>
      {item.name}
    </MenuItem>
  ));

  // console.log("***DATA-FIELD RENDER***");
  return (
    <TextField
      error={props?.required && !value}
      required={props?.required}
      key={props.data?.name} 
      name={props.data?.name} 
      label={props.data?.label}
      value={value}
      size='small'
      margin='none'
      variant='outlined'
      select={props.selectItems?.length > 0}
      type={props.type}
      multiline={props.full}
      minRows={props.full ? 2 : 1}
      maxRows={props.full ? 2 : 1}
      sx={{
        height: 30, display: props.data?.hidden ? 'none' : 'flex',
        gridColumn: props.data?.col, gridRow: props.data?.row,
        gridColumnEnd: props.full ? 5 : props.data?.col,
        gridRowEnd: props.full ? 10 : props.data?.row
      }}
      onChange={handleChange}
      InputProps={{ style: { color: 'inherit' }}}
      // InputLabelProps={{ style: { color: 'inherit' }, }}
    >
      {cobmoItems}
    </TextField>
  )
}