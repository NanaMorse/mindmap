interface options {
  msgType?: string;
}

interface socketOptions extends options{
  broadcastTriggerFilter?: string;
}

export const createActionSocketMiddleware = (ws, {broadcastTriggerFilter = '_isBroadcast', msgType = 'syncAction'}: socketOptions = {}) => ({getState, dispatch}) => next => action => {
  next(action);

  if (!action[broadcastTriggerFilter]) {
    const sendMsg = {
      type: msgType,
      data: JSON.stringify(action)
    };

    ws.send(JSON.stringify(sendMsg));
  }
};

export const createSyncStoreSocketMiddleware = (ws, {broadcastTriggerFilter = '_isBroadcast', msgType = 'syncStore'}: socketOptions = {}) => ({getState, dispatch}) => next => action => {
  next(action);

  if (!action[broadcastTriggerFilter]) {
    const sendMsg = {
      type: msgType,
      data: JSON.stringify(getState())
    };

    ws.send(JSON.stringify(sendMsg));
  }
};
