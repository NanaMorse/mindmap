import * as KeyCode from '../constants/KeyCode';
import {selectionsManager, events} from '../managers';
import * as EventTags from '../constants/EventTags';

import reduxUndo from '../managers/reduxundo';
import store from '../store';

const elementsIdToStopPropagation = ['updateLabel'];

const operatorMap = {
  [KeyCode.Z_KEY] (e) {
    if (e.metaKey || e.ctrlKey) {
      if (e.shiftKey) {
        reduxUndo.redo();
        events.emit(EventTags.UNDO_OR_REDO_TRIGGERED);
      } else {
        reduxUndo.undo();
        events.emit(EventTags.UNDO_OR_REDO_TRIGGERED);
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
    const isAAncestorOfB = getAncestorCheckMethod(store.getState(), selectionsArray);
    
    // filter selected child topic which it's parent topic was selected too.
    const selectionsArrayCopy = selectionsArray.filter((selectionB) => {
      return !selectionsArray.some((selectionA) => {
        return isAAncestorOfB(selectionA, selectionB);
      }) && selectionB.getType() !== 'ROOT_TOPIC';
    });
    
    selectionsArrayCopy.forEach((selection) => {
      selection.onRemoveSelfTopic();
    });
  }
};

function getAncestorCheckMethod(store, selections) {
  const ancestorMap = {};
  
  const feed = store.topics.feed;

  selections.forEach((selection) => {
    getSelectionsAncestorList(selection);
  });
  
  return function (selectionA, selectionB) {
    return selectionA.props.id !== feed.id && ancestorMap[selectionB.props.id].includes(selectionA.props.id);
  };
  
  function getSelectionsAncestorList(selection) {
    const targetId = selection.props.id;
    const targetList = ancestorMap[targetId] = [];
    
    if (targetId === feed.id) return;
    
    search();
    
    function search(searchSource = feed) {
      if (!searchSource.children) return;
      
      for (const childFeed of searchSource.children) {
        if (childFeed.id === targetId) {
          targetList.push(searchSource.id);
          return true;
        }

        targetList.push(searchSource.id);
        if (search(childFeed)) {
          return true;
        }

        targetList.pop();
      }
    }
  }
}

document.querySelector('body').addEventListener('keydown', function (e) {
  if (elementsIdToStopPropagation.includes(e.target.id)) return true;

  const keyCode = e.keyCode;
  keyCode in operatorMap && operatorMap[keyCode](e);
});