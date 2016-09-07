import { combineReducers } from 'redux'

import sheetreducer from './sheetreducer';
import topicsreducer from './topicsreducer';

export default combineReducers({
  sheet : sheetreducer,
  topics : topicsreducer
});