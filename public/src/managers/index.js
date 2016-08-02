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

export const mindTree = (() => {
  const tree = {};
  
  const componentMap = {};
  
  const findNode = (id, targetTree = tree) => {
    if (targetTree.id === id) {
      return targetTree;
    } else {
      for (const childTree of targetTree.children) {
        const result = findNode(id, childTree);
        if (result) return result;
      }
    }
  };
  
  const addNode = (parentId, id, component) => {
    if (!parentId) {
      tree.id = id;
      tree.children = [];
    } else {
      findNode(parentId).children.push({
        id, children : []
      });
    }
    
    componentMap[id] = component;
  };
  
  const getTree = () => tree;
  
  const getMap = () => componentMap;
  
  return { getTree, getMap, addNode };
})();