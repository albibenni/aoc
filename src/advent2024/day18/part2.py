"""
--- Part Two ---
The Historians aren't as used to moving around in this pixelated universe as you are. You're afraid they're not going to be fast enough to make it to the exit before the path is completely blocked.

To determine how fast everyone needs to go, you need to determine the first byte that will cut off the path to the exit.

In the above example, after the byte at 1,1 falls, there is still a path to the exit:

O..#OOO
O##OO#O
O#OO#OO
OOO#OO#
###OO##
.##O###
#.#OOOO
However, after adding the very next byte (at 6,1), there is no longer a path to the exit:

...#...
.##..##
.#..#..
...#..#
###..##
.##.###
#.#....
So, in this example, the coordinates of the first byte that prevents the exit from being reachable are 6,1.

Simulate more of the bytes that are about to corrupt your memory space. What are the coordinates of the first byte that will prevent the exit from being reachable from your starting position? (Provide the answer as two integers separated by a comma with no other characters.)

"""

from collections import deque

s = 70

coords = [list(map(int, line.split(","))) for line in open("./2024/day18/data.txt")]


def connected(n):
    grid = [[0] * (s + 1) for _ in range(s + 1)]

    for c, r in coords[:n]:
        grid[r][c] = 1

    q = deque([(0, 0)])
    seen = {(0, 0)}

    while q:
        r, c = q.popleft()
        for nr, nc in [(r + 1, c), (r, c + 1), (r - 1, c), (r, c - 1)]:
            if nr < 0 or nc < 0 or nr > s or nc > s:
                continue
            if grid[nr][nc] == 1:
                continue
            if (nr, nc) in seen:
                continue
            if nr == nc == s:
                return True
            seen.add((nr, nc))
            q.append((nr, nc))

    return False


lo = 0
hi = len(coords) - 1

while lo < hi:
    mi = (lo + hi) // 2
    if connected(mi + 1):
        lo = mi + 1
    else:
        hi = mi

print(*coords[lo], sep=",")
