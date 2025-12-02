#![allow(dead_code)]
use std::io::Read;

fn modulo(base: i32, dial: i32) -> i32 {
    return ((dial % base) + base) % base;
}

pub fn sol1() -> (i32, i32) {
    //FILE HANDLING YEEY
    let pwd = std::env::current_dir();
    let file_path = pwd.unwrap().to_string_lossy().to_string() + "/src/advent2025/data/1p.txt";
    let file = std::fs::File::open(file_path);
    let mut content = String::new();
    file.unwrap().read_to_string(&mut content).unwrap();
    let lines: Vec<&str> = content.lines().collect();
    let mut dial = 50;
    let mut click1 = 0;
    let mut click2 = 0;

    for el in lines {
        let first_char = el.chars().nth(0).unwrap();
        let direction = if first_char == 'L' { -1 } else { 1 };
        let counts = &el[1..].parse::<i32>().unwrap();
        for _i in 1..=*counts {
            dial += direction;
            dial = modulo(100, dial);
            click2 += if dial == 0 { 1 } else { 0 }
        }
        if dial == 0 {
            click1 += 1;
        }
    }
    return (click1, click2);
}
