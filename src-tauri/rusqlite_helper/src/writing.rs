//! ********************************************************************************************** /
//!                               ФУНКЦИИ ЗАПИСИ В БАЗУ ДАННЫХ
//! ********************************************************************************************** /

/// Функция записи в связанную таблицу БД содержимого переданной структуры
pub fn write<T: super::DBTable<T>>(db_path: &str, record: &T) -> Result<usize, rusqlite::Error> {
  let sql = record.generate_write("id");
  super::funcs::execute(db_path, &sql, [])
}
/// Функция записи в указанную таблицу БД содержимого переданной структуры
pub fn write_table<T: super::DBTable<T>>(db_path: &str, table: &str, record: &T) -> Result<usize, rusqlite::Error> {
  let mut sql = record.generate_write("id");
  sql = super::funcs::replace_word(
    &sql,
    table,
    if sql.starts_with("Update") { 1 } else { 2 }
  );
  super::funcs::execute(db_path, &sql, [])
}
