import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Router from 'koa-router';
import {
  sortWith,
  map,
  pluck,
  descend,
  prop,
  pipe,
  tap,
  ifElse,
  is,
  reduce,
  intersection,
} from 'ramda';
import { URL } from 'url';

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

    const [first, ...less] = q.split(' ').filter(word => !stopwords.has(word));

    console.log(index[first], less);
    const sortSearchResult = pipe(
      tap(console.log),
      reduce((allUrl, word) => intersection(allUrl, index[word]), index[first]),
      tap(console.log),
      map(url => ({
        url,
        rank: rank[url],
      })),
      sortWith([descend(prop('rank'))]),
      tap(console.log),
      pluck('url'),
    );
    const getResult = ifElse(
      is(Array),
      sortSearchResult,
      () => 'Nothing Search',
    );
    ctx.body = getResult(less);
  } catch (err) {
    console.log(err);
    ctx.body = 'Bad!';
    ctx.status = 404;
  }
});

export default router;
