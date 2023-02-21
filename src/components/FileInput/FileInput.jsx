import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { open } from '@tauri-apps/api/dialog';
import { useState } from "react";

export default function FileInput({name, label, defaultPath}) {
  const [file, setFile] = useState(defaultPath)
  
  const handlers = {
    Click: () => {
      open({
        multiple: false,
        filters: [{
          name: 'База данных SQLite3',
          extensions: ['sqlite']
        }]
      }).then(value => !!value && setFile(value));
    },
    Change: (event) => {
      console.log(event.target.value)
      setFile(event.target.value)
    }
  }

  return (
    <Stack direction='row' sx={{ width: '100%', gap: 1, display: 'flex', justifyContent: 'space-between'}}>
      <TextField name={name} label={label} value={file} onChange={handlers.Change} sx={{ flexGrow: 1 }}
        inputProps={{ style: { height: 30, padding: 5, margin: 1 } }}/>
      <Button variant='contained' size='small' color='warning' width={8} onClick={handlers.Click}
        sx={{ width: '40px', minWidth: '40px', pb: 0}}>...</Button>
    </Stack>
  )
}