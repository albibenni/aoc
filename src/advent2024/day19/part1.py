from functools import cache

lines = open("./2024/day19/data.txt").read().splitlines()

patterns = set(lines[0].split(", "))
maxlen = max(map(len, patterns))


@cache
def can_obtain(design):
    if design == "":
        return True
    for i in range(min(len(design), maxlen) + 1):
        if design[:i] in patterns and can_obtain(design[i:]):
            return True
    return False


"""
without built-in cache decorator
"""

cache = {}


def can_obtain_explicit_catch(design):
    if design == "":
        return True
    if design in cache:
        return cache[design]
    for i in range(min(len(design), maxlen) + 1):
        if design[:i] in patterns and can_obtain_explicit_catch(design[i:]):
            cache[design] = True
            return True
    cache[design] = False
    return False


print(sum(1 if can_obtain(design) else 0 for design in lines[2:]))
print(sum(1 if can_obtain_explicit_catch(design) else 0 for design in lines[2:]))
