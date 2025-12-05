#![allow(dead_code)]
use std::{cmp::max, io::Read};

pub fn sol5() -> (i64, i64) {
    //FILE HANDLING YEEY
    let pwd = std::env::current_dir();
    let file_path = pwd.unwrap().to_string_lossy().to_string() + "/src/advent2025/data/5p.txt";
    let file = std::fs::File::open(file_path);
    let mut content = String::new();
    file.unwrap().read_to_string(&mut content).unwrap();
    let lines: Vec<&str> = content.lines().collect();

    // PROBLEM

    let idx = lines
        .iter()
        .position(|line| line.trim().is_empty())
        .unwrap();
    println!("SEPARATOR LINE: {}", idx);

    let mut ranges: Vec<(i64, i64)> = vec![];
    let mut ids: Vec<i64> = vec![];

    for i in 0..idx {
        let (min, max) = lines.get(i).unwrap().trim().split_once("-").unwrap();
        ranges.push((min.parse::<i64>().unwrap(), max.parse::<i64>().unwrap()));
    }
    for i in idx + 1..lines.len() {
        let val = lines.get(i).unwrap().trim().parse::<i64>().unwrap();
        ids.push(val);
    }

    let mut count = 0;
    for id in ids {
        let is_fresh = ranges.iter().any(|(min, max)| id >= *min && id <= *max);
        count += if is_fresh { 1 } else { 0 }
    }

    // 2nd part
    ranges.sort_by(|a, b| a.0.cmp(&b.0));
    // or     ranges.sort_by_key(|&(min, _)| min);
    // or     ranges.sort();  // Works automatically for tuples

    let mut merged: Vec<(i64, i64)> = vec![];
    for range in ranges {
        if merged.len() == 0 {
            merged.push((range.0, range.1));
        } else {
            let last = merged.last_mut().unwrap();
            if range.0 <= last.1 + 1 {
                last.1 = max(last.1, range.1);
            } else {
                // no overlap
                merged.push((range.0, range.1));
            }
        }
    }

    let count2: i64 = merged.iter().map(|(a, b)| b - a + 1).sum();
    return (count, count2);
}
