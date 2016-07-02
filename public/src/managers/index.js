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
  
  const findNode = (id, targetTree) => {
    if (!targetTree) {
      for (const treeNode in tree) {
        if (tree.hasOwnProperty(treeNode)) {
          if (id === treeNode) {
            return tree[treeNode];
          } else {
            const result = findNode(id, treeNode[treeNode]);
            if (result) return result;
          }
        }
      }
    } else {
      return targetTree.filter((child) => {
        if (child.hasOwnProperty(id)) {
          return true;
        }
      })[id]
    }
  };
  
  const addNode = (parentId, id) => {
    if (!parentId) {
      tree[id] = [];
    } else {
      findNode(parentId).push({
        [id] : []
      });
    }
    
    console.log(tree);
  };
  
  return { addNode };
})();