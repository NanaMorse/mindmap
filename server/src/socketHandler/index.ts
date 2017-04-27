import * as WebSocket from 'ws'
import * as fs from 'fs'
import { ServerEventTags, ClientEventTags } from 'share/eventtags'

const storeFilePath = './storedata.json';

class SocketHandler {

  /**
   * @description 启动的ws server
   * */
  private webSocketServer: WebSocket.Server;

  constructor(webSocketServer) {
    this.webSocketServer = webSocketServer;
    webSocketServer.on('connection', (ws) => this.onClientConnect(ws))
  }

  /**
   * @description 当有客户端连接 / while a new client connect
   * @param ws
   * */
  private onClientConnect(ws: WebSocket) {
    this.sendFullStoreDataToClient(ws);
    ws.on('message', (message) => this.onClientSendMessageToServer(message, ws))
  }

  /**
   * @description 向客户端发送完整store数据
   * */
  private sendFullStoreDataToClient(ws: WebSocket) {
    const storeData = fs.readFileSync(storeFilePath, 'utf-8');
    ws.send({ type: ServerEventTags.RECEIVE_STORE_DATA, data: storeData })
  }

  /**
   * @description 监听client端发送的数据
   * */
  private onClientSendMessageToServer(message: { type: string, data: any }, ws: WebSocket) {
    const { type, data } = message;

    switch (type) {
      case ClientEventTags.SYNC_STORE: {
        return this.saveStoreDataToServer(data);
      }
      case ClientEventTags.SYNC_ACTION: {
        return this.broadcastActionToOtherClient(ws, data);
      }
    }
  }

  /**
   * @description 将客户端同步的store数据写至本地
   * @todo 考虑使用server端reducer来更新server端的store
   * */
  private saveStoreDataToServer(storeData) {
    storeData = JSON.parse(storeData);
    delete storeData.routing;
    delete storeData['@@dva'];
    storeData = JSON.stringify(storeData);

    fs.writeFile(storeFilePath, storeData, function (err) {
      if (err) throw err;
      console.log('write ok!');
    });
  }

  /**
   * @description 将action发送给其他的客户端
   * */
  private broadcastActionToOtherClient(ws: WebSocket, data) {
    const parsedAction = JSON.parse(data);
    // set broadcast filter
    parsedAction['_isBroadcast'] = true;

    this.webSocketServer.clients.forEach((client) => {
      if (client !== ws) client.send(JSON.stringify({
        type: 'receiveBroadcastAction',
        data: JSON.stringify(parsedAction)
      }));
    });
  }
}

export default SocketHandler