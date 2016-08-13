import * as KeyCode from '../constants/KeyCode';
import {selectionsManager} from '../managers';

import reduxUndo from '../managers/reduxundo';

const operatorMap = {
  [KeyCode.Z_KEY] (e) {
    if (e.metaKey || e.ctrlKey) {
      if (e.shiftKey) {
        reduxUndo.redo();
      } else {
        reduxUndo.undo();
      }
    }
  },
  
  [KeyCode.TAB_KEY] (e) {
    e.preventDefault();
    
    const selectionsArray = selectionsManager.getSelectionsArray();
    if (selectionsArray.length !== 1) return false;

    selectionsArray[0].onAddChildTopic()
  },
  
  [KeyCode.DELETE_KEY] (e) {
    e.preventDefault();

    const selectionsArray = selectionsManager.getSelectionsArray();
    selectionsArray.forEach((selection) => {
      selection.onRemoveSelfTopic();
    });
  }
};

document.querySelector('body').addEventListener('keydown', function (e) {
  const keyCode = e.keyCode;
  keyCode in operatorMap && operatorMap[keyCode](e);
});