from functools import reduce


def make_hashtable(nbuckets):
    return reduce(lambda hashtable, _: hashtable + [[]], range(0, nbuckets),
                  [])


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

courses = {
    'june2043': {
        'cs111': {
            'name': 'Historical Computers - Before Voice Activation',
            'teacher': 'Scotty'
        },
        'cs312': {
            'assistant': 'Amy',
            'name': 'Build your own Time Machine',
            'teacher': 'Melody'
        }
    },
    'apr2012': {
        'cs262': {
            'assistant': 'Peter C.',
            'prereq': 'cs101',
            'name': 'Programming Languages - Building a Web Browser',
            'teacher': 'Wes'
        },
        'cs101': {
            'assistant': 'Sarah',
            'name': 'Building a Search Engine',
            'teacher': 'Dave'
        },
        'cs253': {
            'prereq': 'cs101',
            'name': 'Web Application Engineering - Building a Blog',
            'teacher': 'Steve'
        },
        'cs373': {
            'name': 'Programming a Robotic Car',
            'teacher': 'Sebastian'
        },
        'cs212': {
            'assistant': 'Andy',
            'prereq': 'cs101',
            'name': 'The Design of Computer Programs',
            'teacher': 'Peter N.'
        },
        'cs387': {
            'name': 'Applied Cryptography',
            'teacher': 'Dave'
        }
    },
    'jan2044': {
        'cs003': {
            'assistant': 'Amy',
            'name': 'Programming a Robotic Robotics Teacher',
            'teacher': 'Jasper'
        },
        'cs001': {
            'name': 'Building a Quantum Holodeck',
            'teacher': 'Dorina'
        },
        'cs312': {
            'assistant': 'Amy',
            'name': 'Build your own Time Machine',
            'teacher': 'Melody'
        }
    },
    'feb2012': {
        'cs101': {
            'assistant': 'Peter C.',
            'name': 'Building a Search Engine',
            'teacher': 'Dave'
        },
        'cs373': {
            'assistant': 'Andy',
            'name': 'Programming a Robotic Car',
            'teacher': 'Sebastian'
        }
    }
}


def involved(courses, person):
    result = {}
    for (time, detail) in courses.items():
        for (course, information) in detail.items():
            if information.get('assistant', information['teacher']) == person:
                key = result.get(time, [])
                key.append(course)
                result[time] = key

    return result


print(involved(courses, 'Scotty'))


def cached_execution(cache, proc, proc_input):
    # Your code here
    hadCached = cache.get(proc_input)
    if hadCached:
        return hadCached

    result = proc(proc_input)
    cache[proc_input] = result

    return result


print(cached_execution({}, lambda a: a * 2, 2))