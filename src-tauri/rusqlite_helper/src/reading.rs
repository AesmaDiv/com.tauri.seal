//! ********************************************************************************************** /
//!                            ФУНКЦИИ ЧТЕНИЯ ИЗ БАЗЫ ДАННЫХ
//! ********************************************************************************************** /

use rusqlite::{Connection, Error, OpenFlags};
use core::result::Result;


/// Функция чтения всех записей из связанной таблицы БД
pub fn read_all<T: super::DBTable<T>>(db_path: &str) -> Result<Vec<T>, Error> {
  let sql = T::generate_select();
  read(db_path, &sql)
}

/// Функция чтения записей из связанной таблицы БД, соответствующих условию
pub fn read_where<T: super::DBTable<T>>(db_path: &str, condition: &str) -> Result<Vec<T>, Error> {
  let mut sql = T::generate_select();
  sql.push_str(&format!(" Where {condition}"));
  read(db_path, &sql)
}

/// Функция чтения всех записей из указаной таблицы БД
pub fn read_table<T: super::DBTable<T>>(db_path: &str, table: &str) -> Result<Vec<T>, Error> {
  let select =  T::generate_select();
  let (sel, _) = select.rsplit_once(' ').unwrap();
  let sql = format!("{sel} {table}");
  read(db_path, &sql)
}

/// Функция чтения записей из указаной таблицы БД, соответствующих условию
pub fn read_table_where<T: super::DBTable<T>>(db_path: &str, table: &str, condition: &str) -> Result<Vec<T>, Error> {
  let select =  T::generate_select();
  let (sel, _) = select.rsplit_once(' ').unwrap();
  let sql = format!("{sel} {table} Where {condition}");
  read(db_path, &sql)
}

/// Функция выполнения запроса выборки из БД
pub fn read<T: super::DBTable<T>>(db_path: &str, sql: &str) -> Result<Vec<T>, Error> {
  let mut result = Vec::new();
  let conn = Connection::open_with_flags(db_path, OpenFlags::SQLITE_OPEN_READ_ONLY)?;
  let mut stmt = conn.prepare(&sql)?;
  let mut res = stmt.query_map([], T::map)?;
  while let Some(item) = res.next() {
    result.push(item?);
  }
  Ok(result)
}