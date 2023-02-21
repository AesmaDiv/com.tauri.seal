import { TableCell, TableRow, TableHead } from "@mui/material";


/** Заголовки столбцов списка тестов */
export default function RLHeaders({columns}) {
  return (
    <TableHead>
      <TableRow>
        {columns
          .map(column => 
            <TableCell className="RLHeaders" key={column.name} sx={{width: column.width}}>
              {column.label}
            </TableCell>
          )}
      </TableRow>
    </TableHead>
  );
}