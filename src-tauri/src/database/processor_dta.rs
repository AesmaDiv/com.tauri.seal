use std::fs::{File, read_dir, canonicalize};
use std::path::PathBuf;
use std::io::Read;

use encoding_rs::WINDOWS_1251;
use encoding_rs_io::DecodeReaderBytesBuilder;

use super::set_type;
use super::models_seal::SType;


pub fn process_dtas(dta_path: &str, db_path: &str) {
  let paths = get_paths(dta_path);
  if paths.len() > 0 {
    let types: Vec<Option<SType>> = paths.iter()
      .map(|_path| 
        parse_type(
          read_dta(_path)
        ))
      .filter(|t| t.is_some())
      .collect();

    let mut processed = 0;
    for sealtype in types {
      processed += if import_type(db_path, &sealtype.unwrap()) { 1 } else { 0 };
    }
    println!("Result: {} types was imported.", processed);
  } else {
    println!("Error getting files list. Please, check path.");
  }
}

fn import_type(db_path: &str, sealtype: &SType) -> bool {
  set_type(db_path, "SealTypes", sealtype) > 0
}

fn get_paths(rel_path: &str) -> Vec<String> {
  if let Ok(abs_path) = canonicalize(&PathBuf::from(rel_path)) {
    if let Ok(list) = read_dir(abs_path) {
      return list
        .filter(|_entry| _entry.is_ok())
        .map(|_path| _path.unwrap().path().display().to_string())
        .filter(|_name| _name.ends_with(".DTA"))
        .collect::<Vec<String>>();
    }
  }
  Vec::new()
}

fn read_dta(_path: &str) -> Vec<String>{
  if let Ok(file) = File::open(_path) {
    let mut rdr = DecodeReaderBytesBuilder::new()
      .encoding(Some(WINDOWS_1251))
      .build(file);

    let mut buffer = String::new();
    if rdr.read_to_string(&mut buffer).is_ok() {
      let result = buffer.split('\n')
        .map(|s| s.to_string())
        .collect::<Vec<String>>();

      return result;
    }
  }
  Vec::new()
}

fn parse_type(lines: Vec<String>) -> Option<SType> {
  let clean_lines: Vec<String> = lines.iter()
    .map(|s| {
      let mut ss = s.clone();
      ss.truncate(ss.find('_').unwrap_or(0));
      return ss.trim().to_string();
    })
    .filter(|i| i != "")
    .collect();

  if clean_lines.len() == 10 {
    let result = SType {
      id        : None,
      producer  : Some(clean_lines[0].to_string()),
      name      : Some(clean_lines[1].to_string()),
      date      : Some(clean_lines[2].to_string()),
      rpm       : Some(clean_lines[3].to_string().parse().unwrap_or(0)),
      limit_thr : Some(clean_lines[4].to_string().parse().unwrap_or(0.0)),
      limit_tmp : Some(clean_lines[5].to_string().parse().unwrap_or(0.0)),
      limit_pwr : Some(clean_lines[6].to_string().parse().unwrap_or(0.0)),
      do_press  : Some(if "1" == clean_lines[7].to_string() {true} else {false}),
      do_thrust : Some(if "1" == clean_lines[8].to_string() {true} else {false}),
      rotation  : Some(clean_lines[9].to_string().parse().unwrap_or(0)),
    };

    return Some(result);
  }
  None
}
