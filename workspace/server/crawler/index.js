require('isomorphic-fetch');
const cheerio = require('cheerio');
const { URL } = require('url');
const { union } = require('lodash');

const cache = {};
const getPage = async url => {
  if (cache[url]) return cache[url];
  console.log(`Page not in cache: ${url}`);
  try {
    const html = await fetch(url).then(res => res.text());
    return cheerio.load(html);
  } catch (err) {
    console.log(err);
  }
};

const addPageToIndex = (index, url, $) => {
  const words = $.text().split(' ');
  words.forEach(word => {
    if (index[word]) {
      index[word].push(url);
    } else {
      index[word] = [url];
    }
  });
};

const getAllLinks = ($, page) => {
  const { origin } = new URL(page);
  return $('a[href]')
    .map((_, element) => {
      const href = $(element).attr('href');
      try {
        new URL(href);
      } catch (err) {
        if (href[0] === '/') {
          return `${origin}${href}`;
        }
        return `${origin}/${href}`;
      }
      return href;
    })
    .get();
};

const isUdacity = url => {
  url = new URL(url);
  return url.hostname.includes('udacity');
};

const crawlWeb = async seed => {
  let tocrawl = [seed];
  const crawled = {};
  const graph = {};
  const index = {};

  while (tocrawl.length) {
    const page = tocrawl.pop();
    if (!crawled[page]) {
      const $ = await getPage(page);
      addPageToIndex(index, page, $);
      const outlinks = getAllLinks($, page);
      graph[page] = outlinks;
      tocrawl = union(tocrawl, outlinks).filter(isUdacity);
      // console.log(tocrawl);
      crawled[page] = true;
    }
  }
};

const bulma = 'https://bulma.io/documentation/form/general/';
crawlWeb('https://www.udacity.com');

// console.log(new URL(bulma));
