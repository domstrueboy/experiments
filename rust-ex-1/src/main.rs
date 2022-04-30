use std::{
    fs::{
        File,
        read_to_string
    },
    io::Write
};

fn main() {
    let mut word = read_to_string("1.txt").expect("Input file reading error");

    word.push_str(" мама любит");

    println!("{}", word);

    let mut file = File::create("2.txt").expect("Output file opening error");
    file.write(word.as_bytes());
}
