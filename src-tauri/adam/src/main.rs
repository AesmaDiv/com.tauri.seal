use adam::{read, write, listen};
use adam::models::{Data, Analog, Digital, Endian};

fn main() {
    println!("This is Adam5000TCP library");
    let a = read::<Analog>("10.10.10.10", Endian::BIG);
    println!("ANALOG {:?}", a);

    let data = Data {
        slot: 0x7,
        channel: 0x0,
        value: 0xff00
    };
    let d = write::<Digital>("10.10.10.10", &data, Endian::BIG);
    println!("DIGITAL {:?}", d);

    if listen().is_ok() {
        println!("Listen success");
    } else {
        println!("Listen failed");
    }
    let a = 0b0101;
    let b = 0b0001;
    println!("{} {} {}", a, b, a & b != 0);
}
