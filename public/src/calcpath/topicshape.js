import * as CommonConstant from '../constants/Common';

const selectBoxSpace = 5;

const getSelectBoxPath = (boxSize, space) => {
  const halfWidth = boxSize.width / 2 + space;
  const halfHeight = boxSize.height / 2 + space;

  return `M ${-halfWidth} ${-halfHeight} ${halfWidth} ${-halfHeight} ` +
      `${halfWidth} ${halfHeight} ${-halfWidth} ${halfHeight} ` +
      `${-halfWidth} ${-halfHeight} Z`;
};

export default {
  
  [CommonConstant.SHAPE_RECT](boxSize) {
    const halfWidth = boxSize.width / 2;
    const halfHeight = boxSize.height / 2;

    const topicShapePath = `M ${-halfWidth} ${-halfHeight} ${halfWidth} ${-halfHeight} ` +
        `${halfWidth} ${halfHeight} ${-halfWidth} ${halfHeight} ` +
        `${-halfWidth} ${-halfHeight} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize, selectBoxSpace);

    return { topicShapePath, topicSelectBoxPath };
  },

  [CommonConstant.SHAPE_ROUNDED_RECT](boxSize) {
    const rx = 5, ry = 5;

    const halfWidth = boxSize.width / 2;
    const halfHeight = boxSize.height / 2;

    const topicShapePath = `M ${-halfWidth + rx} ${-halfHeight} ${halfWidth - rx} ${-halfHeight} ` +
      `Q ${halfWidth} ${-halfHeight} ${halfWidth} ${-halfHeight + ry} L ${halfWidth} ${halfHeight - ry} ` +
      `Q ${halfWidth} ${halfHeight} ${halfWidth - rx} ${halfHeight} L ${-halfWidth + rx} ${halfHeight} ` +
      `Q ${-halfWidth} ${halfHeight} ${-halfWidth} ${halfHeight - ry} L ${-halfWidth} ${-halfHeight + ry} ` +
      `Q ${-halfWidth} ${-halfHeight} ${-halfWidth + rx} ${-halfHeight} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize, selectBoxSpace);

    return { topicShapePath, topicSelectBoxPath };
  }
}