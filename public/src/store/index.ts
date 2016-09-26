import { createStore, applyMiddleware } from 'redux';

import demo from '../../demo';
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

const initialState = JSON.parse(localStorage.getItem('mindmap')) || demo;

const store = createStoreWithMiddleware(CombineUndoReducer(reducer), initialState);

const saveToLocalStorage = () => {
  localStorage.setItem('mindmap', JSON.stringify(store.getState()));
};

store.subscribe(saveToLocalStorage);

export default store;