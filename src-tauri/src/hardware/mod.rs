extern crate adam;

use rand::Rng;

use adam::models::{Data, Analog, Digital, AdamData, Endian};
use adam::{read, write};


static mut ANALOG: Analog = Analog {
  slot: [[0u16; 8]; 8],
};
static mut DIGITAL: Digital = Digital {
  slot: [0u16; 8]
};

pub fn read_adam(address: &str) -> AdamData {
  let mut analog = read::<Analog>(address, Endian::BIG);
  let mut digital = read::<Digital>(address, Endian::BIG);

  unsafe {
    if analog.is_none() { analog = Some(randomize_analog()) /* analog = Some(ANALOG.clone()) */}
    if digital.is_none() { digital = Some(DIGITAL.clone()) }
  }

  return AdamData{ analog, digital };
}

pub fn write_adam(address: &str, data: &Data, slottype: &str) -> bool {
  match slottype {
    "analog" => return write::<Analog>(address, data, Endian::BIG),
    "digital" => return write::<Digital>(address, data, Endian::BIG),
    _ => return false
  }
}

fn randomize_analog() -> Analog {
  Analog { slot: [[rand::thread_rng().gen_range(0..0xFFFF); 8]; 8] }
}
