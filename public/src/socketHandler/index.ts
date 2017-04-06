import app from 'src/app';

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
          return initCallback(JSON.parse(parsedData.data), this.wsInstance);
        }

        case 'receiveBroadcastAction': {
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