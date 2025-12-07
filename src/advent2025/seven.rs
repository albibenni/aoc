#![allow(dead_code)]
use std::{
    char,
    collections::{HashMap, HashSet},
    io::Read,
};

pub fn sol7() -> (i64, i64) {
    //FILE HANDLING YEEY
    let pwd = std::env::current_dir();
    let file_path = pwd.unwrap().to_string_lossy().to_string() + "/src/advent2025/data/7p.txt";
    let file = std::fs::File::open(file_path);
    let mut content = String::new();
    file.unwrap().read_to_string(&mut content).unwrap();

    let lines: Vec<&str> = content.lines().collect();

    let mut splitter_set: HashSet<String> = HashSet::new();

    let mut grid: Vec<Vec<char>> = lines.iter().map(|line| line.chars().collect()).collect();
    let mut s_index: usize = 0;

    for i in 0..grid.len() - 1 {
        let line_arr = grid[i].clone();
        let next_line = &mut grid[i + 1];
        for j in 0..line_arr.len() {
            let value = line_arr[j];
            if value == 'S' {
                next_line[j] = '|';
                s_index = j;
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

    //2nd part

    let grid2: Vec<Vec<char>> = lines.iter().map(|line| line.chars().collect()).collect();
    let mut current_row: HashMap<usize, usize> = HashMap::new();
    current_row.insert(s_index, 1);

    for i in 0..grid.len() - 1 {
        let line_arr = grid2[i + 1].clone();
        let mut next_line: HashMap<usize, usize> = HashMap::new();
        for (col_n, sum) in current_row {
            println!("{},  {}", col_n, sum);
            let value = line_arr[col_n];
            if value == '^' {
                if col_n > 0 {
                    let prev_sum = *next_line.get(&(col_n - 1)).unwrap_or(&0);
                    next_line.insert(col_n - 1, prev_sum + sum);
                }
                if col_n + 1 < grid[i].len() {
                    let prev_sum = *next_line.get(&(col_n + 1)).unwrap_or(&0);
                    next_line.insert(col_n + 1, prev_sum + sum);
                }
            } else {
                let prev_sum = *next_line.get(&col_n).unwrap_or(&0);
                next_line.insert(col_n, prev_sum + sum);
            }
        }
        current_row = next_line;
    }

    let mut total: usize = 0;
    for v in current_row.values() {
        total += v;
    }
    return (first_res, total as i64);
}
