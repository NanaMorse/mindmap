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
      tree.children = ( tree.children || []);
    } else {
      // todo 如何在这里保证总是能找到parentNode
      const childrenArray = findNode(parentId).children;

      if (childrenArray.find(child => child.id === id)) return;

      childrenArray.push({ id, children : [] });
    }
    
    componentMap[id] = component;
  };
  
  const getTree = () => tree;
  
  const getMap = () => componentMap;
  
  return { getTree, getMap, addNode };
})();