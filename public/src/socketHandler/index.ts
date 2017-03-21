import { initStoreWithData, getStore } from '../store';

class SocketHandler {

  private wsInstance: WebSocket;

  constructor(initCallback) {
    this.connectSocketServer();
    this.registerSocketMessageHandler(initCallback);
  }

  private connectSocketServer() {
    // todo set socket server path to config file
    this.wsInstance = new WebSocket('ws://localhost:3000')
  }

  private registerSocketMessageHandler(initCallback: Function) {
    this.wsInstance.onmessage = (msg) => {
      const parsedData = JSON.parse(msg.data);

      switch (parsedData.type) {
        case 'getStoreData': {
          return initCallback(initStoreWithData(this.wsInstance, JSON.parse(parsedData.data)));
        }

        case 'receiveBroadcastAction': {
          return getStore().dispatch(JSON.parse(parsedData.data));
        }
      }
    };

    this.wsInstance.onclose = () => {
      console.log('lost connection!');
    };
  }

}

export default SocketHandler