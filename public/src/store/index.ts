import { createStore, applyMiddleware } from 'redux';

import { createActionSocketMiddleware, createSyncStoreSocketMiddleware } from './middlewares/createWebSocketMiddleware';

let store;

export const initStoreWithData = (ws, storeData) => {
  const createStoreWithMiddleware = applyMiddleware(createActionSocketMiddleware(ws), createSyncStoreSocketMiddleware(ws))(createStore);

  //store = createStoreWithMiddleware(CombineUndoReducer(), storeData);

  const saveToLocalStorage = () => {
    localStorage.setItem('mindmap', JSON.stringify(store.getState()));
  };

  store.subscribe(saveToLocalStorage);
  
  return store;
};

export const getStore = () => store;