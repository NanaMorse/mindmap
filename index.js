const koa = require('koa');
const serve = require('koa-static');
const app = koa();
const WebSocketServer = require('ws').Server;
const fs = require('fs');

app.use(serve('./public'));

const wss = new WebSocketServer({server: app.listen(3000)});

wss.on('connection', function (ws) {
  console.log('connection!');

  ws.send(JSON.stringify({
    type: 'getStoreData',
    data: getStoreData()
  }));
});

// get store data
function getStoreData() {
  return fs.readFileSync('./storedata.json', 'utf-8');
}

console.log('application is running on port 3000');