require('isomorphic-fetch');
const cheerio = require('cheerio');
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

const getAllLinks = $ => {
  // fetch 只能抓去绝对路由的 URL, 所以必须开头是 http 才行
  return $('a[href^=http]')
    .map((_, element) => $(element).attr('href'))
    .get();
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
      const outlinks = getAllLinks($);
      graph[page] = outlinks;
      tocrawl = union(tocrawl, outlinks);
      crawled[page] = true;
    }
  }
};

crawlWeb('https://bulma.io/documentation/form/general/');
