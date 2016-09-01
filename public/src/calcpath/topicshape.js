import * as CommonConstant from '../constants/Common';
import DefaultStyle from '../constants/DefaultStyle';

const getSelectBoxPath = (boxSize) => {
  const halfWidth = boxSize.width / 2 + DefaultStyle.selectBoxSpace;
  const halfHeight = boxSize.height / 2 + DefaultStyle.selectBoxSpace;

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

    const topicSelectBoxPath = getSelectBoxPath(boxSize);

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

    const topicSelectBoxPath = getSelectBoxPath(boxSize);

    return { topicShapePath, topicSelectBoxPath };
  },

  [CommonConstant.SHAPE_PARALLELOGRAM](boxSize) {
    const {width, height} = boxSize;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const cutLength = height / DefaultStyle.parallelogramSlope;

    const topicShapePath = `M ${-halfWidth + cutLength} ${-halfHeight} h ${width - cutLength} ` +
      `L ${halfWidth - cutLength} ${halfHeight} h ${cutLength - width} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize);

    return { topicShapePath, topicSelectBoxPath };
  }
}