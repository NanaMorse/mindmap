import { createStore, applyMiddleware } from 'redux';

import reducer from '../reducer';

import { events } from '../managers'
import * as EventTags from '../constants/EventTags';

import { undoMiddleware, CombineUndoReducer } from './middlewares/undo';

// register undo middleware callback
undoMiddleware.onUndoPush = () => {
  events.emit(EventTags.PUSH_UNDO_STACK);
};

undoMiddleware.onUndoOrRedoInvoke = () => {
  events.emit(EventTags.UNDO_OR_REDO_TRIGGERED);
};

const createStoreWithMiddleware = applyMiddleware(undoMiddleware)(createStore);

let store;

export const initStoreWithData = (storeData) => {
  store = createStoreWithMiddleware(CombineUndoReducer(reducer), storeData);

  const saveToLocalStorage = () => {
    localStorage.setItem('mindmap', JSON.stringify(store.getState()));
  };

  store.subscribe(saveToLocalStorage);
  
  return store;
};

export const getStore = () => store;