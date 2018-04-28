import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Router from 'koa-router';
import cheerio from 'cheerio';
import {
  sortWith,
  map,
  pluck,
  descend,
  prop,
  pipe,
  tap,
  ifElse,
  length,
  reduce,
  union,
} from 'ramda';
import { URL } from 'url';
import axios from 'axios';

const readFile = promisify(fs.readFile);

const router = new Router();
const indexFilePath = path.resolve(__dirname, '../db/index.json');
const rankFilePath = path.resolve(__dirname, '../db/rank.json');
const stopWordsPath = path.resolve(__dirname, './stopwords.json');
let index = null;
let rank = null;
let stopwords = null;

router.get('/search', async ctx => {
  // console.log('request', ctx.request);
  const params = new URL('http://localhost' + ctx.url);
  const q = params.searchParams
    .get('q')
    .toLocaleLowerCase()
    .trim();

  try {
    if (index === null || rank === null) {
      const reads = Promise.all([
        readFile(indexFilePath, 'utf-8'),
        readFile(rankFilePath, 'utf-8'),
        readFile(stopWordsPath, 'utf-8'),
      ]);
      [index, rank, stopwords] = (await reads).map(JSON.parse);
      stopwords = new Set(stopwords);
    }

    const search = q.split(' ').filter(word => !stopwords.has(word));
    console.log(search);

    const sortSearchResult = pipe(
      reduce(
        (allUrl, word) => union(allUrl, index[word] || []),
        index[search[0]] || [],
      ),
      map(url => ({
        url,
        rank: rank[url],
      })),
      sortWith([descend(prop('rank'))]),
      tap(console.log),
      pluck('url'),
    );
    const getResult = ifElse(length, sortSearchResult, () => 'Nothing Search');
    const result = getResult(search);

    ctx.body = {
      urls: result,
      preload: await reload(result),
    };
  } catch (err) {
    console.log(err);
    ctx.body = 'Bad!';
    ctx.status = 404;
  }
});

async function reload(links) {
  try {
    const htmls = links.slice(0, 5).map(link => {
      if (!link.startsWith('http')) {
        link = 'https://stackoverflow.com' + link;
      }
      return axios.get(link, { responseType: 'text' }).then(prop('data'));
    });

    const content = [];
    for (const html of htmls) {
      const $ = cheerio.load(await html);
      const text = $(
        '.container #mainbar .question .postcell .post-text',
      ).html();
      content.push(text);
    }
    return content;
  } catch (err) {
    console.log(err);
    return [];
  }
}
export default router;
