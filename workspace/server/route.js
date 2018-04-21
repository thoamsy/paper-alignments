import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Router from 'koa-router';
import { URL } from 'url';

const readFile = promisify(fs.readFile);

const router = new Router();
const filePath = path.resolve(__dirname, '../db/stackoverflow.json');
let index = null;

router.get('/search', async ctx => {
  // console.log('request', ctx.request);
  const params = new URL('http://localhost' + ctx.url);
  const q = params.searchParams.get('q');

  try {
    if (index === null) {
      const txt = await readFile(filePath, {
        encoding: 'utf-8',
      });
      index = JSON.parse(txt).map(question => ({
        ...question,
        title: question.title.toLowerCase(),
      }));
    }

    const search = index.filter(({ title }) => title.includes(q.toLowerCase()));
    if (!search.length) {
      ctx.body = 'Nothing search';
      return;
    }

    ctx.body = JSON.stringify(search);
  } catch (err) {
    console.log(err);
    ctx.body = 'Bad!';
    ctx.status = 404;
  }
});

export default router;
