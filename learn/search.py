index = []


def add_to_index(index, keyword, url):
    for record in index:
        if record[0] == keyword:
            record[1].append(url)
            return
    index.append([keyword, [url]])


add_to_index(index, 'udacity', 'http://udacity.com')
add_to_index(index, 'computing', 'http://acm.org')
add_to_index(index, 'udacity', 'http://npr.org')
print(index)
