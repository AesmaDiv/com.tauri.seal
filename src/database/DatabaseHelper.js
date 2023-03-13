import { invoke } from '@tauri-apps/api/tauri';
import { getCurrentDate } from '../functions/shared';
import { CONFIG } from '../configs/cfg_application';


/** Запрос в бэкэнду - чтение списка записей */
export const helperReadRecordList = async function(condition) {
  let result = [];
  console.warn("reading testlist from", CONFIG.db.path);
  let object = await invoke('read_testlist', {dbPath: CONFIG.db.path, condition: condition});
  Array.isArray(object) && result.push(...object);

  return result;
}
/** Запрос в бэкэнду - чтение таблицы типоразмеров */
export const helperReadSealTypes = async function(condition) {
  let result = [];
  let object = await invoke('read_types', {dbPath: CONFIG.db.path, table: "SealTypes"});
  Array.isArray(object) && result.push(...object);

  return result;
}
/** Запрос в бэкэнду - чтение таблицы типа [ID, Name] */
export const helperReadDictionary = async function(table) {
  let result = [];
  let object = await invoke('read_dictionary', {dbPath: CONFIG.db.path, table: table});
  Array.isArray(object) && result.push(...object);

  return result;
}
/** Запрос в бэкэнду - чтение записи */
export const helperReadRecord = async function(rec_id) {
  let object = await invoke('read_record', {dbPath: CONFIG.db.path, recId: rec_id});

  return object.length ? object[0] : {};
}
/** Запрос в бэкэнду - обновление записи */
export const helperUpdateRecord = async function(record) {
  record.datetest = getCurrentDate();
  let result = await invoke('write_record', {dbPath: CONFIG.db.path, record: record});

  return result;
}
/** Запрос в бэкэнду - удаление записи */
export const helperDeleteRecord = async function(record) {
  let result = await invoke('delete_dictionary', {dbPath: CONFIG.db.path, table: "Records", dict: record});
  return result ? record.id : 0;
}