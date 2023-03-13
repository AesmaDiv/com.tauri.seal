import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";

import PressureCharts from "../Charts/PressChart";
import PowerConsumptionCharts from "../Charts/PowerChart";

import { roundValue, decimal2time } from "../../functions/shared";
import { HEADERS_PROTOCOL, COMBOS, transliterate } from "../../configs/cfg_localization";
import { POINTS_MAX as power_points_max } from "../../configs/cfg_power";

import logo from "./logo_epu.png";
import cls from './Protocol.module.css'


/** Протокол испытания */
export default function Protocol() {
  /** текущая запись */
  const record   = useSelector(state => state.recordReducer.record);
  /** точки */
  const points   = useSelector(state => state.recordReducer.points);
  /** текущий ипоразмер */
  const sealtype = useSelector(state => state.recordReducer.current_type);
  /** ссылка для принтера */
  const printRef = useRef();
  const [eng, setEng] = useState(false);

  /** переключить язык */
  const handleTranslate = () => setEng(prev => !prev);

  const headers = HEADERS_PROTOCOL[eng]
  /** значения комбобоксов */
  const cmbVal = (name, index) => isNaN(index) || COMBOS[eng][name][index - 1].name;
  const head        = cmbVal('state',       record.head);
  const base        = cmbVal('state',       record.base);
  const coupling    = cmbVal('presence',    record.coupling);
  const rotation    = cmbVal('rotation',    record.shaft_rotation);
  const connection  = cmbVal('connection',  record.shaft_connection);
  const oil_water   = cmbVal('presence',    record.oil_water);
  const oil_shavs   = cmbVal('presence',    record.oil_shavs);
  const oil_color   = eng ? 'Amber' : record.oil_color;

  const trans = (text) => eng ? transliterate(text) : text;

  console.log("*** PROTOCOL RENDER ***");
  return (
    <div className={cls.protocol}>
      <div className={cls.buttons}>
        <ReactToPrint
            trigger={() => <button>Печать</button>}
            content={() => printRef.current}
        />
        <input type='button' onClick={handleTranslate} value={'Перевести'}/>
      </div>
      <div className={cls.body} ref={printRef}>
        <header>
          <div className={cls.header_pump_type}>№ { record.id }</div>
          <div className={cls.header_title}>
            <img src={logo} alt={'logo'}/>
            <p>{headers.title}</p>
            <p>{headers.town}</p>
          </div>
          <div className={cls.header_test_time}>{ record.datetest }</div>
        </header>
        <main>
          <p style={{marginTop: 40}}>{headers.title_info}</p>
          <hr/>
          <div className={cls.info_block}>
            <span>{headers.producer}</span>
            <span>{headers.sealtype}</span>
            <span>{headers.serial}</span>
            <br/>
            <span>{headers.lmt_pwr}</span>
            <span>{headers.lmt_tmp}</span>
            <span>{headers.lmt_thr}</span>
            <span>{headers.connect}</span>
            <span>{headers.rotation}</span>

            <span>{trans(sealtype.producer)}</span>
            <span>{trans(sealtype.name)}</span>
            <span>{record.serial}</span>
            <br/>
            <span>{sealtype.limit_pwr}</span>
            <span>{sealtype.limit_tmp}</span>
            <span>{record.limit_thr}</span>
            <span>{connection}</span>
            <span>{rotation}</span>
            
            <span>{headers.exten_top}</span>
            <span>{headers.exten_btm}</span>
            <span>{headers.shaft_yeild}</span>
            <span>{headers.shaft_diam}</span>
            <br/>
            <span>{headers.runout_rad}</span>
            <span>{headers.runout_end}</span>
            <span>{headers.axial_play}</span>
            <span>{headers.momentum}</span>

          
            <span>{record.exten_top}</span>
            <span>{record.exten_btm}</span>
            <span>{record.shaft_yield}</span>
            <span>{record.shaft_diam}</span>
            <br/>
            <span>{record.runout_rad}</span>
            <span>{record.runout_end}</span>
            <span>{record.axial_play}</span>
            <span>{record.momentum}</span>

            <span/>
            <span/>
            <span/>
            <span/>
            <span/>
            <span>&#8804; 0.16 {headers.mms}</span>
            <span>&#8804; 0.10 {headers.mms}</span>
            <span>0.25 .. 1.2 {headers.mms}</span>
            <span>&#8804; 0.40 {headers.kgf}</span>
          </div>
          <br/>
          <p>{headers.title_test}</p>
          <hr/>
          <div className={cls.info_block}>
            <span>{headers.datetest}</span>
            <span>{headers.daterecv}</span>
            <span>{headers.customer}</span>
            <span>{headers.ordernum}</span>
            <br/>
            <span>{headers.field}</span>
            <span>{headers.lease}</span>
            <span>{headers.well}</span>
            <span>{headers.daysrun}</span>

            <span>{record.datetest}</span>
            <span>{record.daterecv}</span>
            <span>{record.customer}</span>
            <span>{record.ordernum}</span>
            <br/>
            <span>{trans(record.field)}</span>
            <span>{trans(record.lease)}</span>
            <span>{trans(record.well)}</span>
            <span>{record.daysrun}</span>

            <span>{headers.head}</span>
            <span>{headers.base}</span>
            <span>{headers.coupling}</span>
            <span>{headers.pressure}</span>
            <br/>
            <span>{headers.oil_color}</span>
            <span>{headers.oil_water}</span>
            <span>{headers.oil_shavs}</span>
            <span>{headers.oil_kvolt}</span>

            <span>{head}</span>
            <span>{base}</span>
            <span>{coupling}</span>
            <span>{record.pressure}</span>
            <br/>
            <span>{oil_color}</span>
            <span>{oil_water}</span>
            <span>{oil_shavs}</span>
            <span>{record.oil_kvolt}</span>
          </div>
          <br/>
          <p>{headers.title_result}</p>
          <hr/>
          <div className={cls.test_charts}>
            <PowerConsumptionCharts for_protocol eng={eng}/>
            <PressureCharts for_protocol eng={eng}/>
          </div>
          <div className={cls.test_table}>
            {buildPointsTable(points, headers)}
          </div>
          <p style={{alignSelf: 'left'}}>{headers.note}</p>
        </main>
        <footer>
          <div className={cls.comments}>
            <p>{headers.comments}</p>
            <div>
              Должен заметить, что мы продолжаем мониторинг, и должен также заметить,
              что это не первый случай, когда после предостережений, высказанных в том
              числе и членами нашей комиссии, такие компании, как Google, удаляют
              вредоносный контент, который, по сути, является противоправным.
            </div>
          </div>
          <div className={cls.signatures}>
            <p>{headers.operator}</p>
            <p>{headers.foreman}</p>
            <p>_________________________</p>
            <p>_________________________</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

const buildPointsTable = (points, headers) => {
  let rows = [];
  const points_count = Math.min(points.test_power.length, power_points_max)
  for (let i = 0; i < points_count; i++) {
    rows.push(
      <tr key={`test_table_row_${i}`}>
        <th scope="row">{i + 1}</th>
        <td>{roundValue(points.test_power[i].thrust, 3) || "-.-"}</td>
        <td>{roundValue(points.test_power[i].power, 3)}</td>
        <td>{roundValue(points.test_power[i].temper, 1)}</td>
        <td>{decimal2time(points.test_power[i].time)}</td>
      </tr>
    )
  }
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">{headers.table_axial}</th>
          <th scope="col">{headers.table_power}</th>
          <th scope="col">{headers.table_temp}</th>
          <th scope="col">{headers.table_time}</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}