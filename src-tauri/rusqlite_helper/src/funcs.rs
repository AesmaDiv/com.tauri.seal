use rusqlite::{Connection, Error, Params, OpenFlags};


/// Функция получения имени поля Primary key
pub fn get_pk_name(dbpath: &str, table: &str) -> String {
  fn read_pk(dbpath: &str, table: &str) -> Result<String, Error> {
    Connection::open_with_flags(&dbpath, OpenFlags::SQLITE_OPEN_READ_ONLY)?.query_row(
      "Select * From pragma_table_info(?) Where pk",
      [table],
      |row| -> Result<String, Error> { row.get(1) }
    )
  }
  let result = read_pk(dbpath, table);
  result.unwrap_or(String::new())
}
/// Функция выполнения запроса к БД
pub fn execute<P: Params>(db_path: &str, sql: &str, params: P) -> Result<usize, Error> {
  let connection = Connection::open_with_flags(db_path, OpenFlags::SQLITE_OPEN_READ_WRITE)?;
  match connection.execute(sql, params) {
    Ok(mut result) => {
      // если это была команда вставки..
      if sql.contains("Insert") {
        // ..возвращаем индекс последнего вставленной записи
        result = connection.last_insert_rowid() as usize;
      }
      Ok(result)
    },
    Err(err) => Err(err)
  }
}
/// Функция транспонилования 2-мерного массива строк
pub fn transpose(arr: &Vec<[String; 2]>) -> Vec<Vec<String>> {
  let mut v1: Vec<String> = Vec::new();
  let mut v2: Vec<String> = Vec::new();
  for item in arr {
    v1.push(item[0].clone());
    v2.push(item[1].clone());
  }
  vec![v1, v2]
}
/// Функция замены слова в предложении
pub fn replace_word(source: &str, replace: &str, index: usize) -> String {
  source.split_whitespace()
    .enumerate()
    .map(|(i, orig)| if i == index { replace } else { orig })
    .collect::<Vec<&str>>()
    .join(" ")
}