import * as types from '../constants/ActionTypes';

export default (currentState = {}, action) => {
  switch (action.type) {
    case types.UPDATE_SHEET_BGCOLOR : {

      return Object.assign({}, currentState, {
        bgColor : action.bgColor
      });
    }

    default : {
      return currentState;
    }
  }
};