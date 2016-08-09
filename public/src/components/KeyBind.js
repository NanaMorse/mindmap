import * as KeyCode from '../constants/KeyCode';

import reduxUndo from '../managers/reduxundo';

const operatorMap = {
  [KeyCode.Z_KEY] (e) {
    if (e.metaKey) {
      if (e.shiftKey) {
        reduxUndo.redo();
      } else {
        reduxUndo.undo();
      }
    }
  }
};

document.querySelector('body').addEventListener('keydown', function (e) {
  const keyCode = e.keyCode;
  keyCode in operatorMap && operatorMap[keyCode](e);
});