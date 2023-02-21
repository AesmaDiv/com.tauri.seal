extern crate adam;

use rand::Rng;

use adam::models::{Data, Analog, Digital, AdamData, Endian};
use adam::{read, write};


static mut ANALOG: Analog = Analog {
  slot: [[0; 8]; 8],
};
static mut DIGITAL: Digital = Digital {
  slot: [0; 8]
};

pub fn read_adam(address: &str) -> AdamData {
  let mut analog = read::<Analog>(address, Endian::BIG);
  let mut digital = read::<Digital>(address, Endian::BIG);

  return AdamData {analog, digital};
  // unsafe {
  //   if analog.is_none() { /*randomize_analog();*/ analog = Some(ANALOG.clone())}
  //   if digital.is_none() { digital = Some(DIGITAL.clone()) }
  // }

  // return AdamData{ analog, digital };
}

pub fn write_adam(address: &str, data: &Data, slottype: &str) -> bool {
  match slottype {
    "analog" => return write::<Analog>(address, data, Endian::BIG),
    "digital" => return write::<Digital>(address, data, Endian::BIG),
    _ => return false
  }
}

fn randomize_analog() {
  unsafe {
    let mut rng = rand::thread_rng();
    for val in ANALOG.slot[0].iter_mut() {
      let new_val = *val as i16 + rng.gen_range(0..0x01FE) - 0xFF;
      *val = if new_val < 0 { 0 } else { new_val as u16 };
    }
  }
}
