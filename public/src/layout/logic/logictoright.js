const paddingLeft = 20;
const paddingTop = 10;

export default function logicToRight(parentTree, positionMap) {
  const { position, boxSize, children } = parentTree;

  let topHeight = 0;
  
  const childrenMiddleHeight = parentTree.childrenBounds.height / 2;
  
  children && children.forEach((childTree) => {
    const childTreeBounds = childTree.bounds;
    const halfChildBoxWidth = childTree.boxSize.width / 2;
    
    const x = position[0] + boxSize.width / 2 + paddingLeft + halfChildBoxWidth;
    const y = position[1] + topHeight + childTreeBounds.height / 2 - childrenMiddleHeight;

    childTree.position = [x, y];
    
    topHeight += childTreeBounds.height + paddingTop;
  });
  
}