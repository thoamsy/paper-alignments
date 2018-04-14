from functools import reduce


def make_hashtable(nbuckets):
    return reduce(lambda hashtable, _: hashtable + [[]], range(0, nbuckets), [])


def hash_string(keyword, buckets):
    return reduce(lambda hash, ch: hash + ord(ch), keyword, 0) % buckets


def hashtable_get_bucket(htable, key):
    return htable[hash_string(key, len(htable))]


def hashtable_add(htable, key, value):
    return hashtable_get_bucket(htable, key).append([key, value])


def hashtable_lookup(htable, key):
    bucket = hashtable_get_bucket(htable, key)
    for entry in bucket:
        if entry[0] == key:
            return entry[1]
        return None


def hashtable_update(htable, key, value):
    bucket = hashtable_get_bucket(htable, key)
    for entry in bucket:
        if entry[0] == key:
            entry[1] = value
            return htable
    bucket.append([key, value])
    return htable


hashtable = make_hashtable(3)
hashtable_add(hashtable, 'fuck', 123)
print(hashtable)
