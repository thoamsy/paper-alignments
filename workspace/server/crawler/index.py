from urllib.parse import urlparse
from urllib.request import urlopen
from urllib.request import Request
from bs4 import BeautifulSoup

cache = {}

def get_page(url):
    if (url in cache):
        return cache[url]
    print('Page not in cache: {0}'.format(url))
    with urlopen(Request(url)) as response:
        content = response.read()
        print(content)
        # return BeautifulSoup(content, 'html')


def addPageToIndex = ()
def is_udacity(url):
    parsed_url = urlparse(url)
    print(parsed_url)


get_page('https://www.udacity.com')
