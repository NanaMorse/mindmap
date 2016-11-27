import * as KeyCode from '../constants/KeyCode';
import {selectionsManager} from '../managers';

import { undoMiddleware } from '../store/middlewares/undo';
import KeyboardEvent = __React.KeyboardEvent;

const elementsIdToStopPropagation = ['onUpdateLabel'];

const operatorMap = {
  [KeyCode.Z_KEY] (e) {
    if (e.metaKey || e.ctrlKey) {
      if (e.shiftKey) {
        undoMiddleware.redo();
      } else {
        undoMiddleware.undo();
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

document.querySelector('body').addEventListener('keydown', function (e: any) {
  if ((<any>elementsIdToStopPropagation).includes(e.target.id)) return true;

  const keyCode = e.keyCode;
  keyCode in operatorMap && operatorMap[keyCode](e);
});