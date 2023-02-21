extern crate adam;
use adam::models::{Data, AdamData};

use super::hardware as hw;
use super::database as db;
use super::database::models_seal as mdl;


#[tauri::command]
pub fn logging(message: String) {
  let msg = format!("Logging:: {}", message);
  println!("{}", msg);
}
#[tauri::command]
pub fn file_exists(path: String) -> bool {
  let result = std::path::Path::new(&path).exists();
  println!("File {} {}exists", &path, if result {""} else {"not "});

  return result;
}

#[tauri::command]
pub fn read_adam(address: &str) -> AdamData {
  hw::read_adam(address)
}

#[tauri::command]
pub fn write_adam(address: &str, data: Data, slottype: &str) -> bool {
  hw::write_adam(address, &data, slottype)
}

#[tauri::command]
pub fn read_testlist(db_path: &str, condition: &str) -> Vec<mdl::TLRow> {
  db::get_testlist(db_path, condition)
}

#[tauri::command]
pub fn read_record(db_path: &str, rec_id: i32) -> Vec<mdl::Records> {
  db::get_record(db_path, rec_id)
}

#[tauri::command]
pub fn read_dictionary(db_path: &str, table: &str) -> Vec<mdl::Dictionary> {
  db::get_dict(db_path, table)
}

#[tauri::command]
pub fn read_types(db_path: &str, table: &str) -> Vec<mdl::SType> {
  db::get_type(db_path, table)
}

#[tauri::command]
pub fn write_record(db_path: &str, record: mdl::Records) -> usize {
  db::set_record(db_path, &record)
}

#[tauri::command]
pub fn write_dictionary(db_path: &str, table: &str, dict: mdl::Dictionary) -> usize {
  db::set_dict(db_path, table, &dict)
}

#[tauri::command]
pub fn delete_record(db_path: &str, record: mdl::Records) -> usize {
  db::del_record(db_path, &record)
}

#[tauri::command]
pub fn delete_dictionary(db_path: &str, table: &str, dict: mdl::Dictionary) -> usize {
  db::del_dict(db_path, table, &dict)
}