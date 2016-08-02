export default function logicToRight(parentTree, positionMap) {
  const position = parentTree.position;
  const bounds = parentTree.bounds;
  
  const middlePositionHeight = bounds.height / 2;
  
  let top = 0;
  parentTree.children.forEach((childTree) => {
    const childTreeBounds = childTree.bounds;
    const childComponentSize = childTree.boxSize;
    
    const x = childComponentSize.width + 20 + position[0];
    const y = top + childTreeBounds.height / 2 - middlePositionHeight + position[1];

    childTree.position = positionMap[childTree.id] = [x, y];
    
    top += childTreeBounds.height;
  });
  
}