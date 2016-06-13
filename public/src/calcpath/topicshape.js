
const getSelectBoxPath = (boxSize, space) => {
  const halfWidth = boxSize.width / 2 + space;
  const halfHeight = boxSize.height / 2 + space;

  return `M ${-halfWidth} ${-halfHeight} ${halfWidth} ${-halfHeight} ` +
      `${halfWidth} ${halfHeight} ${-halfWidth} ${halfHeight} ` +
      `${-halfWidth} ${-halfHeight} Z`;
};

export default {
  
  'react' (boxSize) {

    const halfWidth = boxSize.width / 2;
    const halfHeight = boxSize.height / 2;

    const topicShapePath = `M ${-halfWidth} ${-halfHeight} ${halfWidth} ${-halfHeight} ` +
        `${halfWidth} ${halfHeight} ${-halfWidth} ${halfHeight} ` +
        `${-halfWidth} ${-halfHeight} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize, 5);

    return { topicShapePath, topicSelectBoxPath };
  }
  
}