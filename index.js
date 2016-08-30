const koa = require('koa');
const serve = require('koa-static');
const app = koa();

app.use(serve('./public'));

app.listen(3000);

console.log('application is running on port 3000');