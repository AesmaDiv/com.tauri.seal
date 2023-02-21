import { React, useRef, useEffect, useState, useCallback } from 'react';
import { Paper } from '@mui/material';
import { Table, TableBody, TableContainer} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import RLDialog from './RLDialog';
import RLHeaders from './RLHeaders';
import RLOptions from './RLOptions';
import RLRow from './RLRow';
import { updateMessage } from '../MessageBox/MessageBox';
import { readRecord, deleteRecord, resetRecord, readDictionaries /*, showMessage */} from '../../redux/recordReducer';
import { helperReadRecordList } from '../../database/DatabaseHelper';


/** Кол-во строк на страницу для списка записей */
const RL_ROWS_PER_PAGE = 50
/** Поля столбцов списка записей */
const RL_COLUMNS = [
  // { width: 80,  sortable: true,   name: 'id',        label: '№'},
  { width: 180, sortable: true,   name: 'datetest',  label: 'Дата испытания'},
  { width: 160, sortable: false,  name: 'ordernum',  label: 'Наряд-заказ №'},
  { width: 160, sortable: false,  name: 'serial',    label: 'Заводской №'},
];
/** Полная длина списка записей */
const RL_FULL_WIDTH = RL_COLUMNS.reduce((a, v) => { return a + v.width }, 0);

/** Список тестов */
export default function RecordList(props) {
  const dispatch = useDispatch();
  const setMessage = updateMessage();
  /** номер текущей записи */
  const rec_id = useSelector(state => state.recordReducer.record.id);
  /** флаг обновления записи */
  const is_updated = useSelector(state => state.recordReducer.is_updated);
  /** список тестов */
  const [list, setList] = useState([]);
  /** диалог удаления записи */
  const [dialog_state, setDialogState] = useState(false);
  /** ссылки на параметны списка */
  const refs = useRef({
    page: 0,
    search: '',
    last_id: 0,
    selected_id: 0,
  });


  /** Диспетчеры redux */
  const dispatchers = {
    del_record: (del_id) => dispatch(deleteRecord(del_id)),
    read_record: (read_id) => dispatch(readRecord(read_id)),
    read_dict: () => dispatch(readDictionaries()),
    reset_record: () => dispatch(resetRecord()),
  };

  /** Чтение списка тестов с применением параметров */
  const readList = useCallback(async function() {
    let condition = refs.current.search;
    condition += refs.current.last_id && rec_id ? ` ID<=${refs.current.last_id} ` : ` ID > 0`;
    condition += ` Order By ID Desc Limit ${RL_ROWS_PER_PAGE}`;
    console.warn("RecordList refreshing with conditions: %s", condition);
    let result = await helperReadRecordList(condition);
    refs.current.last_id = result[0]?.id || 0;

    return result;
  }, []);

  /** обработчики */
  const handlers = {
    /** закрытие диалога удаления записи */
    Dialog: (confirm_delete) => {
      setDialogState(false);
      confirm_delete && dispatchers.del_record(refs.current.selected_id);
    },
    /** выбор записи из списка */
    Select: async (event, row) => {
      refs.current.selected_id = row.id;
      if (event.ctrlKey) {
        setDialogState(true);
        return;
      }
      (row.id === rec_id) || dispatchers.read_record(row.id);
    },
    /** переключение страницы */
    Page: (name) => {
      if (name === 'bkwrd' && refs.current.page === 0) return;
      refs.current.page = refs.current.page + (name === 'bkwrd' ? -1 : 1); 
      refs.current.last_id = refs.current.page ?
        refs.current.last_id - RL_ROWS_PER_PAGE * refs.current.page :
        0;
      readList(rec_id, refs).then(setList);
    },
    /** изменение параметров поиска */
    Search: (params) => {
      const {key, val} = params;
      refs.current.search = [key, val].every(i => i) ?
      ` ${key} Like '%${val}%' And` :
      '';
      readList(rec_id, refs).then(setList);
    }
  }

  /** обновление списка при изменении флага */
  useEffect(() => {
    console.warn("RECORD LIST IS UPDATED");
    refs.current.last_id = 0;
    readList(rec_id, refs, dispatchers).then(new_list => {
      new_list.length || dispatchers.reset_record();
      dispatchers.read_dict();
      setList(new_list);
    }).catch("Error reading DB. Possible wrong path.");
  }, [is_updated]);

  /** вывод сообщения */
  useEffect(() => {
    list.length || setMessage({ text: 'Ошибка загрузки БД', severity: 'error' });
  }, [list]);
  useEffect(() => {
    rec_id && setMessage({ text: `Запись № ${rec_id} загружена.`, severity: 'success' })
  }, [rec_id]);

  console.log("%c *** RECORD-LIST RENDER ***", 'color: #ff4fff');
  return (
    <Paper className="RecordList" elevation={10} width={props.width || '600px'} height={props.height || '100%'}
      sx={{display: 'flex', flexDirection: 'column', height: 'calc(100% - 10px)', pt: 1}}
    >
      <TableContainer sx={{overflow: 'scroll'}}>
      <Table stickyHeader aria-label="sticky table" size='small'>
        <RLHeaders columns={RL_COLUMNS}/> 
        <TableBody>
          {list.map((row) => 
            <RLRow
            key={row.id}
            data={row}
            columns={RL_COLUMNS}
            selected={row.id === rec_id} 
            handleSelect={handlers.Select}
            />
          )}
        </TableBody>
        </Table>
      </TableContainer>
      <RLOptions handleSearch={handlers.Search} handlePage={handlers.Page} fullWidth={RL_FULL_WIDTH}/>
      <RLDialog is_open={dialog_state} onClose={handlers.Dialog} rec_id={refs.current.selected_id} />
    </Paper>
  );
}