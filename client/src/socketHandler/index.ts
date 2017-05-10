import app from 'src/app'
import { ServerEventTags } from 'root/share/eventtags'
import config from 'src/config'

class SocketHandler {

  private wsInstance: WebSocket;

  constructor(initCallback) {
    this.connectSocketServer();
    this.registerSocketMessageHandler(initCallback);
  }

  private connectSocketServer() {
    this.wsInstance = new WebSocket(config.socketServer)
  }

  private registerSocketMessageHandler(initCallback: Function) {
    this.wsInstance.onmessage = (msg: MessageEvent) => {
      const parsedData = JSON.parse(msg.data);

      switch (parsedData.type) {
        case ServerEventTags.RECEIVE_STORE_DATA: {
          return initCallback(JSON.parse(parsedData.data), this.wsInstance);
        }

        case ServerEventTags.RECEIVE_BROADCAST_ACTION: {
          return app.dispatch(JSON.parse(parsedData.data));
        }
      }
    };

    this.wsInstance.onclose = () => {
      console.log('lost connection!');
    };
  }
}

export default SocketHandler