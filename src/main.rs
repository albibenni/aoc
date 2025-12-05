mod advent2025;

fn main() {
    println!("Hello, AOC!");
    let (one, two) = advent2025::one::sol1();
    let three2 = advent2025::three::sol3();
    let (five1, five2) = advent2025::five::sol5();
    println!("Part 1: {}", one);
    println!("Part 2: {}", two);
    println!("day 3");
    // println!("Part 1: {}", one1);
    println!("Part 2: {}", three2);
    println!("Part 1: {}", five1);
    println!("Part 2: {}", five2);
}
