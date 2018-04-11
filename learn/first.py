speed = 299792458
nano = 10 ** -9

print(speed * nano * 100)

str = 'wocao'
print(str[0:-1+3])

print(str.find('a', 2))

print(round(6.43343))


print(str[::-1] == str)

print(2 ** 100)


def print_multiplication_table(n):
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            print('{0} * {1} = {2}'.format(i, j, i * j))


print_multiplication_table(4)
