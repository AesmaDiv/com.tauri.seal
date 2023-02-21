import { Stack } from "@mui/system";
import { IconButton } from "@mui/material";
import { default as Bwrd } from '@mui/icons-material/ArrowBackIos';
import { default as Fwrd } from '@mui/icons-material/ArrowForwardIos';

import RLSearch from "./RLSearch";


/** Панель параметров фильтрации списка тестов */
export default function RLOptions ({handleSearch, handlePage, fullWidth}) {
  return (
    <Stack className="RLOptions" direction='row' sx={{ maxWidth: {fullWidth}, justifyContent: 'space-between', p: 1 }}>
      <RLSearch onSubmit={handleSearch}/>
      <Stack direction='row'>
        <IconButton sx={{width: 20}} onClick={e => handlePage('bkwrd')}><Bwrd/></IconButton>
        <IconButton sx={{width: 20}} onClick={e => handlePage('frwrd')}><Fwrd/></IconButton>
      </Stack>
    </Stack>
  );
}