#![allow(non_snake_case)]
extern crate rusqlite_helper;
use rusqlite_helper::dbtable;

dbtable!(
  struct Dictionary {
    id        : i32,
    name      : String
  }
);
dbtable!(
  struct SType {
    id        : i32,
    name      : String,
    producer  : String,
    date      : String,
    rpm       : i32,
    limit_thr : f64,
    limit_tmp : f64,
    limit_pwr : f64,
    do_press  : bool,
    do_thrust : bool,
    rotation  : i32
  }
);
dbtable!(
  struct TLRow {
    id        : i32,
    datetest  : String,
    ordernum  : String,
    serial    : String
  }
);
dbtable!(
  struct Records {
    id                : i32, 
    datetest          : String,
    daterecv          : String,
    customer          : String,
    ordernum          : String,
    series            : String,
    sealtype          : i32,
    serial            : String,
    field             : String,
    lease             : String,
    well              : String,
    daysrun           : String,
    head              : i32,
    base              : i32,
    coupling          : i32,
    oil_color         : String,
    oil_water         : i32,
    oil_shavs         : i32,
    oil_kvolt         : String,
    pressure          : String,
    shaft_yield       : String,
    shaft_diam        : String,
    shaft_rotation    : i32,
    shaft_connection  : i32,
    exten_top         : String,
    exten_btm         : String,
    momentum          : String,
    axial_play        : String,
    runout_rad        : String,
    runout_end        : String,
    coating           : i32,
    vibration         : String,
    comments          : String,
    test_press        : String,
    test_power        : String,
    rawdata           : Vec<u8>
  }
);
