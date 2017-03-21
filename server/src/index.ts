const koa = require('koa');
const serve = require('koa-static');
const app = koa();
const WebSocketServer = require('ws').Server;
const fs = require('fs');

app.use(serve('./public'));

const wss = new WebSocketServer({server: app.listen(3000)});

wss.on('connection', function (ws) {

  ws.send(JSON.stringify({
    type: 'getStoreData',
    data: getStoreData()
  }));

  
  ws.on('message', function (msg) {
    const parsedMsg = JSON.parse(msg);

    switch (parsedMsg.type) {
      case 'syncStore': {
        return saveStoreData(parsedMsg.data);
      }

      case 'syncAction': {
        return broadcastAction(ws, parsedMsg.data);
      }
    }
  })
});

// get store data
function getStoreData() {
  return fs.readFileSync('./storedata.json', 'utf-8');
}

// save store data
function saveStoreData(storeData) {
  fs.writeFile('./storedata.json', storeData, function (err) {
    if (err) throw err;
    console.log('write ok!');
  });
}

// broadcast action
function broadcastAction(ws, action) {
  const parsedAction = JSON.parse(action);
  // set broadcast filter
  parsedAction['_isBroadcast'] = true;

  wss.clients.forEach((client) => {
    if (client !== ws) client.send(JSON.stringify({
      type: 'receiveBroadcastAction',
      data: JSON.stringify(parsedAction)
    }));
  });
}

console.log('application is running on port 3000');