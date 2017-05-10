import { ClientEventTags } from 'root/share/eventtags'
const broadcastTriggerFilter = '_isBroadcast';

function webSocketMiddlewareGenerator(msgType: string, getData: (getState, dispatch, action) => String) {
  return (ws) => ({getState, dispatch}) => next => action => {
    next(action);

    const { type } = action;
    if (/^@@router/.test(type) || action[broadcastTriggerFilter]) return;

    const sendMsg = {
      type: msgType,
      data: getData(getState, dispatch, action)
    };

    ws.send(JSON.stringify(sendMsg));
  }
}

export const createActionSocketMiddleware = webSocketMiddlewareGenerator(ClientEventTags.SYNC_ACTION, (getState, dispatch, action) => {
  return JSON.stringify(action);
});

export const createSyncStoreSocketMiddleware = webSocketMiddlewareGenerator(ClientEventTags.SYNC_STORE, (getState) => {
  return JSON.stringify(getState());
});
