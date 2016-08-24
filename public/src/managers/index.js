const Events = require('events');

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
  
  return { getSelectionsArray, addSelection, selectSingle, clearSelection, removeSelection }
})();