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
          
    case types.UPDATE_TOPIC_FONTSIZE : {
      return deepAssign({}, currentState, {
        topicById : {
          [action.id] : {
            style : {
              fontSize : action.fontSize
            }
          }
        }
      });
    }
          
    case types.UPDATE_TOPIC_FILLCOLOR : {
      return deepAssign({}, currentState, {
        topicById : {
          [action.id] : {
            style : {
              fillColor : action.fillColor
            }
          }
        }
      });
    }
      
    default : {
      return currentState;
    }
  }
};