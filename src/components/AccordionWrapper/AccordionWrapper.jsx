import { Suspense, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


/** Оборачиватель в разворачиваемые группы */
export default function AccordionWrapper({width, height, direction, children}) {
  /** ключ развернутой группы по умолчанию */
  const default_key = children?.length ? children[0].props.accordion_key : '';
  /** ключ развернутой группы */
  const [expanded_key, setExpanded] = useState(default_key);

  /** Обработчик выбора группы */
  function handleSelect(item) {
    // разворачиваем выбранную группу
    (item.props.accordion_key === expanded_key) || setExpanded(item.props.accordion_key);
  }

  /** Оборачивание переданного компонента в разворачиваемую группу */
  function createComponent(item) {
    const is_expanded = expanded_key === item.props.accordion_key;
    return (
      <Accordion
        className="AccordionTabs"
        key={item.props.accordion_key}
        expanded={is_expanded}
        disableGutters={true}
        elevation={10}
        TransitionProps={{timeout: 500}}
      >
        <AccordionSummary sx={{width: '100%'}} expandIcon={<ExpandMoreIcon/>} onClick={e => handleSelect(item)}>
          <Typography>{item.props.accordion_title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{height: "580px"}}>
            <Suspense fallback={<div>loading</div>}>{ is_expanded && item }</Suspense>
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <Stack direction={direction} width={width || '100%'} height={height || 'auto'} gap={1}>
      {children.length ? 
        children.map(item => createComponent(item)) :
        createComponent(children)}
    </Stack>
  )
}