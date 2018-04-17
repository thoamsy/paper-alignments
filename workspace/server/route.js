import Router from 'koa-router';
// import { renderToString } from 'react-dom/server'
import { URL } from 'url';

const router = new Router();

router.get('/search', async ctx => {
  // console.log('request', ctx.request);
  const params = new URL('http://localhost' + ctx.request.url);
  const q = params.searchParams.get('q');
  ctx.body = q;
});

export default router;
