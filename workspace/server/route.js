import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Router from 'koa-router';
import isOnline from 'is-online';
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
  startsWith,
  identity,
  concat,
} from 'ramda';
import { URL } from 'url';
import axios from 'axios';

const readFile = promisify(fs.readFile);
const cache = new Map();

const router = new Router();
const indexFilePath = path.resolve(__dirname, '../db/index.json');
const rankFilePath = path.resolve(__dirname, '../db/rank.json');
const stopWordsPath = path.resolve(__dirname, './stopwords.json');
let index = null;
let rank = null;
let stopwords = null;

router.get('/search', async ctx => {
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
      map(
        ifElse(
          startsWith('http'),
          identity,
          concat('https://stackoverflow.com'),
        ),
      ),
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
  const isonline = await isOnline({ timeout: 3000 });
  if (!isonline) {
    return '网络连接出现问题, 将仅仅显示 URL 结果';
  }
  try {
    const texts = links
      .slice(0, 5)
      .map(
        link =>
          cache.get(link) ||
          axios.get(link, { responseType: 'text' }).then(prop('data')),
      );

    return texts.reduce(async (preload, text, i) => {
      const $ = cheerio.load(await text);
      const html = $(
        '.container #mainbar .question .postcell .post-text',
      ).html();
      const tags = $('.container #mainbar .question .postcell .post-taglist')
        .text()
        .trim()
        .split(' ');
      cache.has(links[i]) || cache.set(links[i], text);
      return (await preload).concat({ html, tags });
    }, []);
  } catch (err) {
    return Array(5).fill({
      html: '读取网站失败, 再试一次吧👀',
      tags: ['network'],
    });
  }
}
export default router;
