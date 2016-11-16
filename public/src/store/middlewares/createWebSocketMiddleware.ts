interface options {
  msgType?: string;
}

interface actionSocketOptions extends options{
  broadcastTriggerFilter?: string;
}

export const createActionSocketMiddleware = (ws, {broadcastTriggerFilter = '_isBroadcast', msgType = 'syncAction'}: actionSocketOptions = {}) => ({getState, dispatch}) => next => action => {
  next(action);

  if (!action[broadcastTriggerFilter]) {
    const sendMsg = {
      type: msgType,
      data: JSON.stringify(action)
    };

    ws.send(JSON.stringify(sendMsg));
  }
};

export const createSyncStoreSocketMiddleware = (ws, {msgType = 'syncStore'}: options = {}) => ({getState, dispatch}) => next => action => {
  next(action);

  const sendMsg = {
    type: msgType,
    data: JSON.stringify(getState())
  };

  ws.send(JSON.stringify(sendMsg));
};
