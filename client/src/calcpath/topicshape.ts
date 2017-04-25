import { TopicShapeType } from '../constants/common';
import { selectBoxSpace, TopicShapeSpecialData } from '../constants/defaultstyle';

const getSelectBoxPath = (boxSize) => {
  let {width, height} = boxSize;
  
  width += selectBoxSpace * 2;
  height += selectBoxSpace * 2;

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return `M ${-halfWidth} ${-halfHeight} h ${width} v ${height} h ${-width} Z`;
};

export default {
  
  [TopicShapeType.RECT](boxSize) {
    const {width, height} = boxSize;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const topicShapePath = `M ${-halfWidth} ${-halfHeight} h ${width} v ${height} h ${-width} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize);

    return { topicShapePath, topicSelectBoxPath };
  },

  [TopicShapeType.ROUNDED_RECT](boxSize) {
    const rx = 5, ry = 5;
    const roundR = TopicShapeSpecialData.roundedRectR;
    const doubleR = roundR * 2;

    const {width, height} = boxSize;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const topicShapePath = `M ${-halfWidth + roundR} ${-halfHeight} h ${width - doubleR} ` +
      `Q ${halfWidth} ${-halfHeight} ${halfWidth} ${-halfHeight + ry} v ${height - doubleR} ` +
      `Q ${halfWidth} ${halfHeight} ${halfWidth - rx} ${halfHeight} h ${doubleR - width} ` +
      `Q ${-halfWidth} ${halfHeight} ${-halfWidth} ${halfHeight - ry} v ${doubleR - height} ` +
      `Q ${-halfWidth} ${-halfHeight} ${-halfWidth + rx} ${-halfHeight} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize);

    return { topicShapePath, topicSelectBoxPath };
  },

  [TopicShapeType.PARALLELOGRAM](boxSize) {
    const {width, height} = boxSize;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const cutLength = height / TopicShapeSpecialData.parallelogramSlope;

    const topicShapePath = `M ${-halfWidth + cutLength} ${-halfHeight} h ${width - cutLength} ` +
      `L ${halfWidth - cutLength} ${halfHeight} h ${cutLength - width} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize);

    return { topicShapePath, topicSelectBoxPath };
  }
}