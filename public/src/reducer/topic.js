import * as types from '../constants/ActionTypes';

export default (currentState = {}, action) => {
  switch (action.type) {
    case types.UPDATE_TOPIC_TEXT : {
      
      return Object.assign({}, currentState, {
        text : action.text
      });
    }
      
    default : {
      return currentState;
    }
  }
};