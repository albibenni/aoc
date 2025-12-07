#![allow(dead_code)]
use std::{char, collections::HashSet, io::Read};

pub fn sol7() -> (i64, i64) {
    //FILE HANDLING YEEY
    let pwd = std::env::current_dir();
    let file_path = pwd.unwrap().to_string_lossy().to_string() + "/src/advent2025/data/7p.txt";
    let file = std::fs::File::open(file_path);
    let mut content = String::new();
    file.unwrap().read_to_string(&mut content).unwrap();

    let lines: Vec<&str> = content.lines().collect();

    let mut splitter_set: HashSet<String> = HashSet::new();

    // Convert all lines to Vec<Vec<char>> so we can modify them
    let mut grid: Vec<Vec<char>> = lines.iter().map(|line| line.chars().collect()).collect();

    for i in 0..grid.len() - 1 {
        let line_arr = grid[i].clone();
        let next_line = &mut grid[i + 1];
        for j in 0..line_arr.len() {
            let value = line_arr[j];
            if value == 'S' {
                next_line[j] = '|';
            } else if value == '|' {
                if next_line[j] == '^' {
                    let splitter_key = format!("{},{}", i, j);
                    if !splitter_set.contains(&splitter_key) {
                        splitter_set.insert(splitter_key);
                    }
                    if j > 0 {
                        next_line[j - 1] = '|';
                    }
                    if j + 1 < line_arr.len() {
                        next_line[j + 1] = '|';
                    }
                } else {
                    next_line[j] = '|';
                }
            }
        }
    }
    let first_res = splitter_set.len() as i64;

    return (first_res, 2);
}
