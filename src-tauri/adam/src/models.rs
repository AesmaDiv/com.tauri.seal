use std::convert::TryInto;

pub enum Endian {
  BIG,
  LITTLE
}
#[derive(std::fmt::Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct Data {
  pub slot: u16,
  pub channel: u16,
  pub value: u16,
}

#[derive(std::fmt::Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct Analog {
  pub slot: [[u16; 8]; 8],
}



#[derive(std::fmt::Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct Digital {
  pub slot: [u16; 8],
}
#[derive(std::fmt::Debug, serde::Serialize, serde::Deserialize, Clone)]
pub struct AdamData {
  pub analog: Option<Analog>,
  pub digital: Option<Digital>,
}

pub trait SlotParam {
  const SIZE: [usize; 2];
  const COMMAND_GET: [u8; 12];
  const COMMAND_SET: [u8; 12];
  const OFFSET: u16;

  fn build_set(data: &Data, endian: Endian) -> [u8; 12] {
    let mut cmd = Vec::from(Self::COMMAND_SET.clone());
    let register = data.slot * Self::OFFSET + data.channel;
    match endian {
      Endian::BIG => {
        cmd.splice(8..10, register.to_be_bytes());
        cmd.splice(10..12, data.value.to_be_bytes());
      },
      Endian::LITTLE => {
        cmd.splice(8..10, register.to_le_bytes());
        cmd.splice(10..12, data.value.to_le_bytes());
      }
    }

    cmd.try_into().unwrap_or([0; 12])
  }
}

impl SlotParam for Analog {
  const SIZE: [usize; 2] = [0x89, 0x80];
  const COMMAND_GET: [u8; 12] = [0x0,0x0,0x0,0x0,0x0,0x6,0x1,0x4,0x0,0x0,0x0,0x40];
  const COMMAND_SET: [u8; 12] = [0x0,0x0,0x0,0x0,0x0,0x6,0x1,0x6,0x0,0x0,0x0,0x0];
  const OFFSET: u16 = 0x0008;
}

impl SlotParam for Digital {
  const SIZE: [usize; 2] = [0x19, 0x10];
  const COMMAND_GET: [u8; 12] = [0x0,0x0,0x0,0x0,0x0,0x6,0x1,0x1,0x0,0x0,0x0,0x80];
  const COMMAND_SET: [u8; 12] = [0x0,0x0,0x0,0x0,0x0,0x6,0x1,0x5,0x0,0x0,0x0,0x0];
  const OFFSET: u16 = 0x0010;
}

pub trait Convert {
  fn convert(data: Vec<u16>) -> Option<Self>
  where Self: Sized;
}

impl Convert for Analog {
  fn convert(data: Vec<u16>) -> Option<Self>
  where Self: Sized {
    let obj: Analog;
    unsafe {
      let values = data.try_into().unwrap();
      obj = std::mem::transmute::<[u16; 0x40], Analog>(values);
    }
    Some(obj)
  }
}

impl Convert for Digital {
  fn convert(data: Vec<u16>) -> Option<Self>
  where Self: Sized {
    let obj: Digital;
    unsafe {
      let values = data.try_into().unwrap();
      obj = std::mem::transmute::<[u16; 0x8], Digital>(values);
    }
    Some(obj)
  }
}
