def step(num):
    num = (num ^ (num * 64)) % 16777216
    num = (num ^ (num // 32)) % 16777216
    num = (num ^ (num * 2048)) % 16777216
    return num


total = 0

for line in open("./2024/day22/data.txt"):
    num = int(line)
    for _ in range(2000):
        num = step(num)
    total += num

print(total)
