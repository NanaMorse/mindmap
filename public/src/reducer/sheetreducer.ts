import * as types from '../constants/ActionTypes';
import { deepAssign } from '../apptools/commonfunc';

export default (currentState = {}, action) => {
  switch (action.type) {
    case types.UPDATE_SHEET_BGCOLOR : {

      return deepAssign({}, currentState, {
        bgColor : action.bgColor
      });
    }

    default : {
      return currentState;
    }
  }
};