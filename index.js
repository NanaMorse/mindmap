const koa = require('koa');

const app = koa();

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);