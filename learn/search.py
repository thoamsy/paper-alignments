from functools import reduce
import time
index = []


def add_to_index(index, keyword, url):
    for record in index:
        if record[0] == keyword:
            record[1].append(url)
            return
    index.append([keyword, [url]])


def add_page_to_index(index, url, content):
    words = content.split(' ')
    for word in words:
        add_to_index(index, word, url)


def lookup(index, keyword):
    for record in index:
        if record[0] == keyword:
            return record[1]
    return []


def make_str(list):
    return reduce(lambda str, ch: str + ch, list)


def make_big_index(size):
    print(time.clock())
    index = []
    letters = ['a', 'a', 'a', 'a', 'a', 'a', 'a']
    while len(index) < size:
        word = make_str(letters)
        add_to_index(index, word, 'fake')
        for i in range(len(letters) - 1, 0, -1):
            if letters[i] < 'z':
                letters[i] = chr(ord(letters[i]) + 1)
                break
            else:
                letters[i] = 'a'
    print(time.clock())
    return index


myindex = make_big_index(10000)
start = time.clock()
lookup(myindex, 'aaaaaaaa')
print(time.clock() - start)
