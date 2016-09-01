const Events = require('events');

import store from '../store';

import {TOPIC_ROOT} from '../constants/Common';

export const events = new Events();

export const selectionsManager = (() => {
  
  const selections = [];

  const getSelectionsArray = () => {
    return selections;
  };

  const addSelection = (selection) => {

    if (selections.indexOf(selection) < 0) {
      selections.push(selection);
    }

  };
  
  const selectSingle = (selection) => {
    clearSelection();
    addSelection(selection);
  };
  
  const clearSelection = () => {
    
    if (!selections.length) return false;
    
    selections.forEach((selection) => {
      selection.onDeselected();
    });

    selections.splice(0);
  };
  
  const removeSelection = (selection) => {
    if (selections.includes(selection)) {
      selections.splice(selections.indexOf(selection), 1);
    }
  };

  const getSelectionsArrayWithoutChild = () => {
    const isAAncestorOfB = getAncestorCheckMethod(selections);

    return selections.filter((selectionB) => {
      return !selections.some((selectionA) => {
          return isAAncestorOfB(selectionA, selectionB);
        }) && selectionB.getType() !== TOPIC_ROOT;
    });
  };

  const getAncestorCheckMethod = (selections) => {
    const ancestorMap = {};

    const topicsInfo = store.getState().topics;

    selections.forEach((selection) => {
      getSelectionsAncestorList(selection);
    });

    return function (selectionA, selectionB) {
      return selectionA.props.id !== topicsInfo.id && ancestorMap[selectionB.props.id].includes(selectionA.props.id);
    };

    function getSelectionsAncestorList(selection) {
      const targetId = selection.props.id;
      const targetList = ancestorMap[targetId] = [];

      if (targetId === topicsInfo.id) return;

      search();

      function search(searchSource = topicsInfo) {
        if (!searchSource.children) return;

        for (const childTopic of searchSource.children) {
          if (childTopic.id === targetId) {
            targetList.push(searchSource.id);
            return true;
          }

          targetList.push(searchSource.id);
          if (search(childTopic)) {
            return true;
          }

          targetList.pop();
        }
      }
    }
  };
  
  return { getSelectionsArray, addSelection, selectSingle, clearSelection, removeSelection, getSelectionsArrayWithoutChild }
})();