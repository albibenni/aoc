#![allow(dead_code)]
use std::{char, io::Read};

pub fn sol6() -> (i64, i64) {
    //FILE HANDLING YEEY
    let pwd = std::env::current_dir();
    let file_path = pwd.unwrap().to_string_lossy().to_string() + "/src/advent2025/data/6p.txt";
    let file = std::fs::File::open(file_path);
    let mut content = String::new();
    file.unwrap().read_to_string(&mut content).unwrap();

    let lines: Vec<&str> = content.lines().collect();
    let grid1st: Vec<Vec<&str>> = lines
        .iter()
        .map(|line| line.split_whitespace().collect())
        .collect();

    let num_cols = grid1st[0].len();
    let mut sum1: i64 = 0;

    for col in 0..num_cols {
        let sign = grid1st[grid1st.len() - 1][col];
        let mut part_sum: i64 = 0;

        for row in 0..grid1st.len() - 1 {
            let num = grid1st[row][col].parse::<i64>().unwrap();
            if sign == "*" {
                part_sum = if part_sum == 0 { num } else { part_sum * num };
            } else {
                part_sum += num;
            }
        }
        sum1 += part_sum;
    }

    let grid2nd: Vec<Vec<char>> = lines.iter().map(|line| line.chars().collect()).collect();

    let mut operators: Vec<char> = vec![];
    let mut indexes: Vec<usize> = vec![];
    let grid_rows = grid2nd.len();
    let last_row = grid2nd.last().unwrap();
    let mut sum2: i64 = 0;
    for i in 0..last_row.len() {
        let element = last_row.get(i).unwrap();
        if *element == ' ' {
            continue;
        }
        operators.push(*element);
        indexes.push(i);
    }
    //?
    indexes.push(grid2nd[0].len() + 1); // add last limit

    for i in 0..operators.len() {
        let operator = operators[i];
        let start = indexes[i];
        let end = indexes[i + 1] - 1;
        let mut numbs: Vec<i64> = vec![];
        for col in start..end {
            let mut num = String::new();
            for row in 0..grid_rows - 1 {
                num.push(grid2nd[row][col]);
            }
            numbs.push(num.trim().parse::<i64>().unwrap());
        }

        sum2 += if operator == '+' {
            numbs.iter().fold(0, |a, b| a + b)
        } else {
            numbs.iter().fold(1, |a, b| a * b)
        };
    }

    return (sum1, sum2);
}
