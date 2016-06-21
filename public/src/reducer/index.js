import { combineReducers } from 'redux'

import sheetreducer from './sheetreducer';
import topicreducer from './topicreducer';

export default combineReducers({
  sheet : sheetreducer,
  topic : topicreducer
});