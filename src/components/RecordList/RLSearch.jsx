import { React, useState } from 'react';
import { Box, InputBase, Select, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { default as Bksp } from '@mui/icons-material/Backspace';

import { RECORD_SEARCH_COLUMNS } from '../../database/db_tables';
import { COLORS } from '../../configs/cfg_application';


/** Стиль кнопки поиска */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: COLORS.background_app,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  marginLeft: 0,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '40px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
/** Стиль иконки поиска */
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
/** Стиль поля поиска */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    color: COLORS.font_app,
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '7ch',
      '&:focus': {
        width: '14ch',
      },
    },
  },
}));
/** Параметры поиска по умолчания */
const CLEAN_SEARCH = {key: '', val: ''};

/** Поиск записи для списка тестов */
export default function RLSearch({onSubmit}) {
  /** текущие параметры поиска */
  const [search, setSearch] = useState(CLEAN_SEARCH);

  /** обработчики */
  const handlers = {
    /** изменение параметров поиска */
    Change: (event) => {
      if (event.key === 'Enter') {
        onSubmit(search);
      } else {
        const {name, value} = event.target;
        setSearch(
          prev => {
            return name === 'search_key' ?
              {...prev, key: value} :
              {...prev, val: value}
          }
        );
      }
    },
    /** сброс параметров поиска */
    Clear: () => {
      onSubmit(CLEAN_SEARCH);
      setSearch(CLEAN_SEARCH);
    }
  }

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row', justifyContent: 'space-around', color: 'white' }}>
      <Select
        size='small'
        name='search_key'
        value={search.key}
        onChange={handlers.Change}
        sx={{ color: 'black', width: 150, height: 40}}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {[
          <MenuItem key='menu_empty' value=''></MenuItem>,
          ...RECORD_SEARCH_COLUMNS
            .map(item =>  <MenuItem key={item.name} value={item.name}>{item.label}</MenuItem>)
        ]}
      </Select>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          size='small'
          name='search_val'
          value={search.val}
          placeholder="Поиск..."
          onChange={handlers.Change}
          onKeyDown={handlers.Change}
          inputProps={{ 'aria-label': 'search' }} 
        />
        <IconButton size='small' sx={{color: 'white'}} onClick={handlers.Clear}><Bksp/></IconButton>
      </Search>
    </Box>
  );
}