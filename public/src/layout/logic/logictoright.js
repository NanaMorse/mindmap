const paddingLeft = 20;

export default function logicToRight(parentTree, positionMap) {
  const { position, boxSize, children } = parentTree;

  let topHeight = 0;
  
  const childrenMiddleHeight = getChildrenMiddleHeight();

  children && children.forEach((childTree) => {
    const childTreeBounds = childTree.bounds;
    const halfChildBoxWidth = childTree.boxSize.width / 2;
    
    const x = position[0] + boxSize.width / 2 + paddingLeft + halfChildBoxWidth;
    const y = position[1] + topHeight + childTreeBounds.height / 2 - childrenMiddleHeight;

    childTree.position = positionMap[childTree.id] = [x, y];
    
    topHeight += childTreeBounds.height;
  });
  
  function getChildrenMiddleHeight() {
    let childrenMiddleHeight = 0;
    
    if (!children) return childrenMiddleHeight;
    
    const length = children.length;
    
    const halfLen = parseInt(length / 2);
    for (let i = 0; i < halfLen; i++) {
      childrenMiddleHeight += children[i].bounds.height;
    }
    
    if (length % 2 !== 0) {
      const halfIndex = halfLen && halfLen + 1;
      childrenMiddleHeight += children[halfIndex].bounds.height / 2;
    }
    
    return childrenMiddleHeight;
  }
}