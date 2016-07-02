export const selectionsManager = (() => {

  const selections = [];

  const getSelectionsArray = () => {
    return selections;
  };

  const addSelection = (selection) => {

    selections.push(selection);

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

    selections.splice(0, selections.length);
  };
  
  return { getSelectionsArray, addSelection, selectSingle, clearSelection }
})();