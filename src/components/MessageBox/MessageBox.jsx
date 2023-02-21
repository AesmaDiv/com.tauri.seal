import { useEffect } from 'react';
import { Box, Grow, Alert} from "@mui/material";
import { useState } from 'react';
import { createContainer } from 'react-tracked';


const INITIAL = {
  text: '',
  severity: 'info'
}
/** Провайдер системы сообщений */
function MessageContext() {
  const [message, setMessage] = useState(INITIAL);
  console.log("+++ MESSAGE PROVIDER RENDER +++");
  return [message, setMessage]
}
export const {
  Provider: MessageProvider,
  useTrackedState: useMessage,
  useUpdate: updateMessage,
} = createContainer(MessageContext);

/** Компонент для отображения сообщений */
export function MessageBox() {
  const message = useMessage();
  const setMessage = updateMessage();

  const open = !!message.text;

  useEffect(() => {
    let timer = setTimeout(() => {
      if(open) {
        setMessage({text: '', severity: 'info'});
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [message.text]);

  // console.log("*** MESSAGE RENDER ***");
  return (
    <Box position='absolute' bottom={8} right={8} display={'flex'} flexDirection={'row-reverse'}>
      <Grow in={open} direction={'left'} timeout={250}>
        <Alert variant="filled" elevation={10} severity={message.severity}>{message.text}</Alert>
      </Grow>
    </Box>
  )
}

