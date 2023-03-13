import { useState } from 'react';
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { Paper, TextField } from '@mui/material';

import { CONFIG } from '../../configs/cfg_application';
import { extract } from '../../functions/shared';


const EditableCell = (props) => {
  const [value, setValue] = useState(props.value || '0');
  return (
    <TableCell size='small' align='center' sx={{ padding: '0px 2px' }}>
      <TextField
        hiddenLabel
        size='small'
        margin='none'
        variant='outlined'
        value={value}
        name={props.name}
        onChange={e => setValue(e.target.value)}
        inputProps={{
          style: {
            width: props.width, height: 16, padding: 5, margin: 1,
            textAlign: 'right',
          }
        }}
      />
    </TableCell>
  );
};

export default function MenuTable({title, table}) {
  const width_minimum = '250px';
  const width_header = '200px';
  const width_cell = '60px';
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table sx={{ minWidth: width_minimum, borderCollapse: 'collapse', columnGap: 0, rowGap: 0 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell size="small" sx={{ minWidth: width_header, textTransform: 'uppercase', fontStyle: 'oblique'}}>{title}</TableCell>
            {table.COLUMNS.map(column =>
              <TableCell key={`header.${column.name}`} height={10} size="small" align="right">
                {column.label}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.ROWS.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell size="small" component="th" scope="row" sx={{ minWidth: width_header, fontWeight: 'bold' }}>
                {row.label}
              </TableCell>
              {table.COLUMNS.map(column => {
                const name = `${row.name}.${column.name}`;
                const value = extract(CONFIG, name);
                return <EditableCell key={name} name={name} width={width_cell} value={value}/>
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

