import { createStore } from 'redux';

import demo from '../../demo';

import reducer from '../reducer';

const initialState = JSON.parse(localStorage.getItem('mindmap')) || demo;

const store = createStore(reducer, initialState);

const saveToLocalStorage = () => {
  localStorage.setItem('mindmap', JSON.stringify(store.getState()));
};

store.subscribe(saveToLocalStorage);

export default store;