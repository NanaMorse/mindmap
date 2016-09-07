import * as KeyCode from '../constants/KeyCode';
import {selectionsManager} from '../managers';

import reduxUndo from '../managers/reduxundo';

const elementsIdToStopPropagation = ['onUpdateLabel'];

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
    selectionsManager.getSelectionsArray().forEach((selection) => {
      selection.onAddChildTopic();
    });
  },
  
  [KeyCode.DELETE_KEY] (e) {
    e.preventDefault();
    selectionsManager.getSelectionsArrayWithoutChild().forEach((selection) => {
      selection.onRemoveSelfTopic();
    });
  }
};

document.querySelector('body').addEventListener('keydown', function (e) {
  if (elementsIdToStopPropagation.includes(e.target.id)) return true;

  const keyCode = e.keyCode;
  keyCode in operatorMap && operatorMap[keyCode](e);
});