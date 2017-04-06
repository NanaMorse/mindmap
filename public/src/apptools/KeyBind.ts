import * as KeyCode from '../constants/KeyCode'
import app from 'src/app'
import { ACTION_UNDO, ACTION_REDO } from 'src/app/middlewares/undo'

const elementsIdToStopPropagation = ['onUpdateLabel'];

const operatorMap = {
  [KeyCode.Z_KEY](e) {
    if (e.metaKey || e.ctrlKey) {
      const dispatchType = e.shiftKey ? ACTION_REDO : ACTION_UNDO;
      app.dispatch({ type: dispatchType });
    }
  },

  [KeyCode.TAB_KEY](e) {
    e.preventDefault();
    app.dispatch({ type: 'map/addChildTopic' });
  },
  
  [KeyCode.ENTER_KEY](e) {
    e.preventDefault();
    app.dispatch({ type: 'map/addTopicAfter' });
  },

  [KeyCode.DELETE_KEY](e) {
    e.preventDefault();
    app.dispatch({ type: 'map/removeTopic' });
  }
};

document.querySelector('body').addEventListener('keydown', function (e: any) {
  if ((<any>elementsIdToStopPropagation).includes(e.target.id)) return true;

  const keyCode = e.keyCode;
  keyCode in operatorMap && operatorMap[keyCode](e);
});