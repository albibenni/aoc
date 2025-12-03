#![allow(dead_code)]
use std::io::Read;

pub fn sol3() -> i64 {
    //FILE HANDLING YEEY
    let pwd = std::env::current_dir();
    let file_path = pwd.unwrap().to_string_lossy().to_string() + "/src/advent2025/data/3p.txt";
    let file = std::fs::File::open(file_path);
    let mut content = String::new();
    file.unwrap().read_to_string(&mut content).unwrap();
    let lines: Vec<&str> = content.lines().collect();
    let mut total_sum: i64 = 0;

    for line in lines {
        // Parse all digits from the line
        let digits: Vec<u8> = line
            .chars()
            .filter_map(|c| c.to_digit(10).map(|d| d as u8))
            .collect();

        if digits.is_empty() {
            continue;
        }

        // We want to keep exactly 12 digits
        let keep = 12;
        let mut to_remove = if digits.len() > 12 {
            digits.len() - 12
        } else {
            0
        };

        let mut stack: Vec<u8> = Vec::new();

        // Greedy algorithm: build the largest number with exactly 'keep' digits
        for digit in digits {
            // Remove smaller digits from stack if we still can remove digits - to_remove keeps in
            // check the `keep` digits before end
            while !stack.is_empty() && stack.last().unwrap() < &digit && to_remove > 0 {
                stack.pop();
                to_remove -= 1;
            }
            stack.push(digit);
        }

        // If we still need to remove digits, remove from the end
        while to_remove > 0 {
            stack.pop();
            to_remove -= 1;
        }

        // Take exactly 'keep' digits
        let result_digits: Vec<u8> = stack.into_iter().take(keep).collect();

        // Convert digits to number
        let mut number: i64 = 0;
        for digit in result_digits {
            number = number * 10 + (digit as i64);
        }

        total_sum += number;
    }

    return total_sum;
}
