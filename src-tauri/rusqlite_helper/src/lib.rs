// ************************************************************************** //
//                           НЕ ТРОГАТЬ ТО ЧТО НИЖЕ                           //
// ************************************************************************** //
pub mod funcs;
pub mod reading;
pub mod writing;
pub mod deleting;


pub trait DBTable<T> {
  /// имена полей
  const NAMES: &'static [&'static str];
  /// генерация запроса SELECT
  fn generate_select() -> String;
  /// генерация запроса INSERT
  fn generate_insert(&self, pk_name: &str) -> String;
  /// генерация запроса UPDATE
  fn generate_update(&self, pk_name: &str) -> String;
  /// генерация запроса DELETE
  fn generate_delete(&self, pk_name: &str) -> String;
  /// генерация запроса записи
  fn generate_write(&self, pk_name: &str) -> String;
  /// функция парсинга ответа на запрос SELECT
  fn map(row: &rusqlite::Row) -> Result<T, rusqlite::Error>;
}
#[macro_export]
macro_rules! inc {
    ($num:expr) => {{
      $num = $num + 1;
      $num
    }};
}
#[macro_export]
macro_rules! dbtable {
  (struct $name:ident {$($fname:ident : $ftype:ty), *}) => {

    #[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
    pub struct $name {
      $(pub $fname: Option<$ftype>), *
    }

    impl $name {
      /// функция получения пар (поле -> значение)
      fn get_pairs(&self) -> Vec<[String; 2]> {
        vec![$([
          String::from(stringify!($fname)),
          if let Some(val) = &self.$fname {
            format!("{:?}", val)
          } else {
            "NULL".to_string()
          }
          // format!("{}", self.$fname)
          // .replace("Some(\"", "")
          // .replace(")", "")
          // .replace("\"", "'")
          // .replace("None", "NULL")
        ],)*]
      }
    }



    impl $crate::DBTable<$name> for $name {
      const NAMES: &'static [&'static str] = &[$(stringify!($fname)),*];

      fn generate_select() -> String { 
        format!("Select {} from {}", Self::NAMES.join(", "), stringify!($name))
      }
      fn generate_insert(&self, pk_name: &str) -> String {
        let pairs = Self::get_pairs(&self)
          .into_iter()
          .filter(|x| x[0] != pk_name)
          .collect();
        let transposed = $crate::funcs::transpose(&pairs);
        format!(
          "Insert Into {} ({}) Values ({})",
          stringify!($name),
          transposed[0].join(", "),
          transposed[1].join(", ")
        )
      }
      fn generate_update(&self, pk_name: &str) -> String {
        let (id, pairs): (Vec<_>, Vec<_>) = Self::get_pairs(&self)
          .into_iter()
          .filter(|x| x[1] != "NULL")
          .partition(|x| x[0] == pk_name);
        format!(
          "Update {} Set {} Where {}",
          stringify!($name),
          pairs.iter().map(|x| x.join("=")).collect::<Vec<String>>().join(", "),
          id.iter().map(|x| x.join("=")).collect::<Vec<String>>().join(" And ")
        )
      }
      fn generate_delete(&self, pk_name: &str) -> String {
        let id_pair = Self::get_pairs(&self).into_iter().find(|x| x[0] == pk_name);
        if id_pair.is_some() {
          let tmp = id_pair.unwrap();
          format!("Delete From {} Where {}={}",
            stringify!($name),
            &tmp[0],
            &tmp[1]
          )
        } else {
          String::new()
        }
      }
      fn generate_write(&self, pk_name: &str) -> String {
        let id_pair = Self::get_pairs(&self).into_iter().find(|x| x[0] == pk_name);
        if id_pair.is_some() && id_pair.unwrap()[1] != "NULL" {
          self.generate_update(pk_name)
        } else {
          self.generate_insert(pk_name)
        }
      }
      
      fn map(row: &rusqlite::Row) -> Result<$name, rusqlite::Error> {
        let mut i: usize = 0;
        Ok( $name { $(
            $fname: row.get($crate::inc!(i) - 1).unwrap_or(None)
        ), *  })
      }
    }
  };
}

