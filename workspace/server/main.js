import Koa from 'koa';
import router from './route';
const app = new Koa();

app.use(router.routes());
app.use(async ctx => (ctx.body = 'hello body'));

app.listen(3001);
