import { TableRow, TableCell } from "@mui/material";


/** Строка списка тестов */
export default function RLRow({data, selected, columns, handleSelect}) {
  /** обработчик клика */
  function onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    handleSelect(event, data);
  }

  return (
    <TableRow className="RLRow" hover tabIndex={-1} key={data.id}
      selected={selected}
      onClick={onClick}
      >
        {columns.map((column) => {
          const cell_val = data[column.name];
          const cell_key = `${column.name}-${cell_val}`;
          return (
            <TableCell key={cell_key} width={column.width}>
              {cell_val}
            </TableCell>
          );
        })}
    </TableRow>
  )
};