//! ********************************************************************************************** /
//!                               ФУНКЦИИ УДАЛЕНИЯ ИЗ БАЗы ДАННЫХ
//! ********************************************************************************************** /

/// Функция удаления указанной записи из связанной таблицы БД
pub fn delete<T: super::DBTable<T>>(db_path: &str, record: &T) -> Result<usize, rusqlite::Error> {
  let sql = record.generate_delete("id");
  super::funcs::execute(db_path, &sql, [])
}
/// Функция удаления указанной записи из указанной таблицы БД
pub fn delete_table<T: super::DBTable<T>>(db_path: &str, table: &str, record: &T) -> Result<usize, rusqlite::Error> {
  let mut sql = record.generate_delete("id");
  sql = super::funcs::replace_word(
    &sql,
    table,
    2
  );
  super::funcs::execute(db_path, &sql, [])
}