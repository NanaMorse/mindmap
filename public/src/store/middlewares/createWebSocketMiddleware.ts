const broadcastTriggerFilter = '_isBroadcast';

function webSocketMiddlewareGenerator(msgType: string, getData: (getState, dispatch, action) => String) {
  return (ws) => ({getState, dispatch}) => next => action => {
    next(action);

    if (!action[broadcastTriggerFilter]) {
      const sendMsg = {
        type: msgType,
        data: getData(getState, dispatch, action)
      };

      ws.send(JSON.stringify(sendMsg));
    }
  }
}

export const createActionSocketMiddleware = webSocketMiddlewareGenerator('syncAction', (getState, dispatch, action) => {
  return JSON.stringify(action);
});

export const createSyncStoreSocketMiddleware = webSocketMiddlewareGenerator('syncStore', (getState) => {
  return JSON.stringify(getState());
});
