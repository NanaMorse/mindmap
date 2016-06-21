import * as types from '../constants/ActionTypes';

export default (currentState = {}, action) => {
  switch (action.type) {
    case types.UPDATE_SHEET_FILLCOLOR : {

      return Object.assign({}, currentState, {
        fillColor : action.fillColor
      });
    }

    default : {
      return currentState;
    }
  }
};