import { Stack } from "@mui/system";

import TestingFormControls from "./TestingFormControls";
import PressureCharts from "../Charts/PressChart";
import PowerConsumptionCharts from "../Charts/PowerChart";

import { STYLES as CLS } from './_styles';


/** Форма испытания */
export default function TestingForm({props, data_fields}) {
  /** график испытания */
  const chart = (props.TRACKED_STATE === "test_press") ?
    <PressureCharts/> :
    <PowerConsumptionCharts/>

  const color = props.NAME === "Pressure" ? "green" : "red";
  console.log(`--- TESTING-FORM RENDER %c ${props.NAME} ---`, `color: ${color}`);
  return (
    <Stack direction='row' sx={CLS.root}>
      <TestingFormControls name={props.NAME} tracked_state={props.TRACKED_STATE} data_fields={data_fields}/>
      {chart}
    </Stack>
  );
}