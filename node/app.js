const Koa = require('koa');
const controller = require('./controller');
const koaBodyParser = require('koa-bodyparser');

const app = new Koa();
const port = 3000;


app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(koaBodyParser());

app.use(controller());

app.listen(port);
console.log('app started at port 3000...');