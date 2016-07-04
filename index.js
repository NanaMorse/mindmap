const koa = require('koa');

const app = koa();

console.log('Hello MindMap');

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);