import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducer';

import { events } from '../managers'
import * as EventTags from '../constants/EventTags';

import { undoMiddleware, CombineUndoReducer } from './middlewares/undo';
import { createActionSocketMiddleware, createSyncStoreSocketMiddleware } from './middlewares/createWebSocketMiddleware';

// register undo middleware callback
undoMiddleware.onUndoPush = () => {
  events.emit(EventTags.PUSH_UNDO_STACK);
};

undoMiddleware.onUndoOrRedoInvoke = () => {
  events.emit(EventTags.UNDO_OR_REDO_TRIGGERED);
};


let store;

export const initStoreWithData = (ws, storeData) => {
  const createStoreWithMiddleware = applyMiddleware(undoMiddleware, createActionSocketMiddleware(ws), createSyncStoreSocketMiddleware(ws))(createStore);

  store = createStoreWithMiddleware(CombineUndoReducer(reducer), storeData);

  const saveToLocalStorage = () => {
    localStorage.setItem('mindmap', JSON.stringify(store.getState()));
  };

  store.subscribe(saveToLocalStorage);
  
  return store;
};

export const getStore = () => store;