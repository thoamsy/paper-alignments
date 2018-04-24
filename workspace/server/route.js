import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Router from 'koa-router';
import { URL } from 'url';

const readFile = promisify(fs.readFile);

const router = new Router();
const filePath = path.resolve(__dirname, '../db/index.json');
let index = null;

router.get('/search', async ctx => {
  // console.log('request', ctx.request);
  const params = new URL('http://localhost' + ctx.url);
  const q = params.searchParams.get('q').toLocaleLowerCase();

  try {
    if (index === null) {
      const txt = await readFile(filePath, {
        encoding: 'utf-8',
      });
      index = JSON.parse(txt);
    }

    const search = index[q];
    if (!Array.isArray(search)) {
      ctx.body = 'Nothing search';
      return;
    }

    ctx.body = search;
  } catch (err) {
    console.log(err);
    ctx.body = 'Bad!';
    ctx.status = 404;
  }
});

export default router;
