#![allow(non_snake_case)]
extern crate rusqlite_helper;
use rusqlite_helper::dbtable;

dbtable!(
  struct Dictionary {
    id: i32,
    name: String
  }
);
dbtable!(
  struct Types {
    id: i32,
    name: String,
    producer: i32
  }
);
dbtable!(
  struct TLRow {
    id: i32,
    datetime: String,
    ordernum: String
  }
);
dbtable!(
  struct Records {
    id: i32, 
    datetime: String,
    ordernum: String,
    customer: i32,
    typecs: i32,
    serial: String,
    nominal: String,
    protocol: String,
    comments: String
  }
);