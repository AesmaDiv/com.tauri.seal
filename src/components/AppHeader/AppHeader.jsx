import { useState } from 'react';
import { Box, Typography, IconButton, FormControlLabel, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';

import MainMenu from '../MainMenu/MainMenu';
import { switchReading, switchTesting } from '../../redux/testingReducer';
import { ACTIVE_TEST } from '../../configs/cfg_hardware';
import { Android12Switch } from './_styles';


/** Заголовок окна приложения */
export default function AppHeader(props) {
  const dispatch = useDispatch();
  /** состояние меню приложения */
  const [menuOpen, setMenuOpen] = useState(false);
  /** якорь, к которому крепится меню */
  const [menuAnchor, setAnchor] = useState(null);

  /** обработчики */
  const handlers = {
    /** открытие меню */
    Open: (event => {
      (!menuAnchor) && setAnchor(event.target);
      (!menuOpen) && setMenuOpen(true);
    }),
    /** закрытие меню */
    Close: (() => {
      setMenuOpen(false);
      setAnchor(null);
    }),
    /** переключение опроса Adam 5000 TCP */
    SwitchAdam: (event => {
      dispatch(switchReading(event.target.checked));
      !event.target.checked && dispatch(switchTesting(ACTIVE_TEST.none));
    }), 
  }

  return (
    <Box height={props.height || 50} p={'10px 10px 0px 10px'}>
      <Paper className='AppHeader' elevation={10} sx={{width: '100%', display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", color: 'inherit'}}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={menuOpen ? handlers.Close : handlers.Open}
            sx={{ ml: 1 }}
            >
            <MenuIcon sx={{zIndex: 4}} />
            <MainMenu open={menuOpen} anchor={menuAnchor} onClose={handlers.Close}/>
          </IconButton>
          <Typography variant="h7" component="div">ООО «ЭПУ Сервис» г.Когалым</Typography>
          <FormControlLabel control={<Android12Switch onChange={handlers.SwitchAdam} />} label="Adam 5000 TCP" />
        </Paper>
    </Box>
  );
}