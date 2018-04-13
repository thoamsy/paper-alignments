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
