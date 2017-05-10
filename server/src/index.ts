import * as Koa from 'koa'
import * as serve from 'koa-static'
import { Server } from 'ws'
import SocketHandler from './socketHandler'

const app = new Koa();

app.use(serve('./public'));

const wss = new Server({server: app.listen(3000)});

new SocketHandler(wss);

console.log('application is running on port 3000');