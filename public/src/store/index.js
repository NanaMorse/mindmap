import { createStore } from 'redux';

import demo from '../../demo';

import reducer from '../reducer';

const store = createStore(reducer, demo);

export default store;