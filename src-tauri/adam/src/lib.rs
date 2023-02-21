use std::io::prelude::*;
use std::net::{TcpStream, UdpSocket};
use std::time::Duration;
use models::{Data, SlotParam, Convert, Endian};

pub mod models;

// const TCP_ADDRESS: &str = "10.10.10.10:502";
const UDP_ADDRESS: &str = "10.10.10.3:5168";
const CONNECT_TIMEOUT: u64 = 50;


pub fn read<T: Convert  + SlotParam>(address: &str, endian: Endian) -> Option<T> {
  let endpoint: &str = &[address, "502"].join(":");
  match read_bytes::<T>(endpoint) {
      Ok(data) => {
        let values: Vec<u16> = to_values(&data, endian);
        let result: Option<T> = T::convert(values);

        return result;
      },
      Err(error) => {
        println!(
          "!!! Error getting {} from {endpoint} >> {:?}",
          std::any::type_name::<T>(),
          error.to_string()
        );
        return None;
      }
  };
}
pub fn write<T: SlotParam>(address: &str, data: &Data, endian: Endian) -> bool {
  let endpoint: &str = &[address, "502"].join(":");
  let bytes = T::build_set(data, endian);
  println!("Adam write {:?}", bytes);
  match write_bytes::<T>(endpoint, &bytes) {
      Ok(_) => return true,
      Err(error) => {
        println!(
          "!!! Error setting {} to {endpoint} >> {:?}",
          std::any::type_name::<T>(),
          error.to_string()
        );
        return false;
      }
  };
}

pub fn listen() -> std::io::Result<()> {
  let socket = UdpSocket::bind(UDP_ADDRESS)?;
  let mut buf = [0; 255];
  let mut count = 0;
  while count < 1 {
      let (_, _) = socket.recv_from(&mut buf)?;
      println!("Message №{} => {:?}", &count, &buf);
      count += 1;
  }

  Ok(())
}

fn read_bytes<T: SlotParam>(address: &str) -> std::io::Result<Vec<u8>> {
  if let Ok(sock) = address.parse() {
    let timeout = Duration::from_millis(CONNECT_TIMEOUT);
    let mut stream = TcpStream::connect_timeout(&sock, timeout)?;
    let mut bytes = vec![0x0; T::SIZE[0]];
    let mut result = vec![0x0; T::SIZE[1]];
    
    if stream.write(&T::COMMAND_GET).is_ok() { stream.read(&mut bytes)?; }
    result.copy_from_slice(&bytes[9..]);

    return Ok(result);
  }
  Err(std::io::Error::new(
    std::io::ErrorKind::AddrNotAvailable,
    "error parsing IP address")
  )
}
fn write_bytes<T: SlotParam>(address: &str, bytes: &[u8; 12]) -> std::io::Result<()> {
  if let Ok(sock) = address.parse() {
    let timeout = Duration::from_millis(CONNECT_TIMEOUT);
    let mut stream = TcpStream::connect_timeout(&sock, timeout)?;

    if stream.write(bytes).is_ok() { return Ok(()) };
  }
  Err(std::io::Error::new(
    std::io::ErrorKind::AddrNotAvailable,
    "error parsing IP address")
  )
}

fn to_values(source: &Vec<u8>, endian: Endian) -> Vec<u16> {
  match endian {
    Endian::BIG => { 
      source.chunks(2).map(|bytes| u16::from_be_bytes([bytes[0],bytes[1]])).collect::<Vec<u16>>()
    },
    _ => {
      source.chunks(2).map(|bytes| u16::from_le_bytes([bytes[0],bytes[1]])).collect::<Vec<u16>>()
    }
  }
}
