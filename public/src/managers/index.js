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
    selections.splice(selections.indexOf(selection), 1);
  };
  
  return { getSelectionsArray, addSelection, selectSingle, clearSelection, removeSelection }
})();

export const mindTree = (() => {
  const componentMap = {};
  
  const addNode = (id, component) => {
    componentMap[id] = component;
  };
  
  const removeNode = (id) => {
    selectionsManager.removeSelection(componentMap[id]);
    delete componentMap[id];
  };
  
  const getTree = () => mindTree.tree;
  
  const getMap = () => componentMap;
  
  return { getTree, getMap, addNode, removeNode };
})();