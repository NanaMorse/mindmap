import * as types from '../constants/ActionTypes';
import { deepAssign } from '../apptools/commonfunc';

export default (currentState = {}, action) => {
  switch (action.type) {

    case types.UPDATE_SHEET_BGCOLOR :
    {
      return deepAssign({}, currentState, {
        bgColor : action.bgColor
      });
    }
      
    case types.UPDATE_SHEET_INFO_ITEM_MODE : 
    {
      return deepAssign({}, currentState, {
        settings: {
          infoItem: {
            [action.infoItem]: action.mode
          }
        }
      });
    }

    default : {
      return currentState;
    }
  }
};