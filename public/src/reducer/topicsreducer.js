import * as types from '../constants/ActionTypes';

import { deepAssign } from '../apptools';

export default (currentState = {}, action) => {
  switch (action.type) {
    case types.UPDATE_TOPIC_TEXT : {

      return deepAssign({}, currentState, {
        topicById : {
          [action.id] : {
            text : action.text
          }
        }
      });
    }
      
    default : {
      return currentState;
    }
  }
};