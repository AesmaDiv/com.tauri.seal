import { Box } from '@mui/system';
import AppHeader from './components/AppHeader/AppHeader';
import RecordList from './components/RecordList/RecordList';
import RecordForm from './components/RecordForm/RecordForm';
import TestingForm from './components/TestingForm/TestingForm';
import AccordionWrapper from './components/AccordionWrapper/AccordionWrapper';
import { HardwareProvider } from './hardware/context';
import { MessageBox, MessageProvider } from './components/MessageBox/MessageBox';

import { PressProps, PRESS_DATANAMES } from './configs/cfg_press';
import { PowerProps, POWER_DATANAMES } from './configs/cfg_power';
import { COLORS } from './configs/cfg_application';

import Protocol from './components/Protocol/Protocol';


function App() {
  console.log("*** APP RENDER ***");
  return (
    <Box display={'flex'} flexDirection={'column'} width={'100vw'} height={'100vh'}
      sx={{
        backgroundColor: COLORS.background_app,
        '.AppHeader,.AccordionTabs,.RecordList,.RLOptions,.RLHeaders,.MuiFormLabel-root': {
          backgroundColor: COLORS.background_form,
          color: COLORS.font_app,
        },
        '.RLRow.MuiTableRow-root:hover': {
          backgroundColor: COLORS.background_app,
        },
        '.RLRow.Mui-selected': {
          backgroundColor: COLORS.primary,
        },
        '.MuiTableCell-root': {
          color: COLORS.font_app,
        },
        '.MuiInputBase-input,.MuiSelect-select': {
          color: COLORS.font_input,
        }
      }}
    >
      <MessageProvider>
        <AppHeader height={"50px"}/>
        <Box component="section"display='flex' flexDirection={'row'} gap={'10px'} height={'calc(100% - 70px)'} padding={1}>
          <RecordList width="600px" height="100%"/>
          <Box display={'flex'} flexDirection={'column'} width={"100%"} height={"100%"}>
            <HardwareProvider>
              <AccordionWrapper direction='column'>
                <RecordForm  accordion_key='key_testinfo'  accordion_title='Информация об объекте'/>
                <TestingForm accordion_key='key_testpress' accordion_title='Давление диафрагм' props={PressProps} data_fields={PRESS_DATANAMES}/>
                <TestingForm accordion_key='key_testpower' accordion_title='Потребляемая мощность' props={PowerProps} data_fields={POWER_DATANAMES}/>
                <Protocol    accordion_key='key_protocol'  accordion_title='Протокол испытания'/>
              </AccordionWrapper>
            </HardwareProvider>
          </Box>
        </Box>
      <MessageBox/>
      </MessageProvider>
    </Box>
  );
}

export default App;