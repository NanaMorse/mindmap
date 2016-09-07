import * as CommonConstant from '../constants/Common';
import DefaultStyle from '../constants/DefaultStyle';

const getSelectBoxPath = (boxSize) => {
  let {width, height} = boxSize;
  
  width += DefaultStyle.selectBoxSpace * 2;
  height += DefaultStyle.selectBoxSpace * 2;

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return `M ${-halfWidth} ${-halfHeight} h ${width} v ${height} h ${-width} Z`;
};

export default {
  
  [CommonConstant.SHAPE_RECT](boxSize) {
    const {width, height} = boxSize;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const topicShapePath = `M ${-halfWidth} ${-halfHeight} h ${width} v ${height} h ${-width} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize);

    return { topicShapePath, topicSelectBoxPath };
  },

  [CommonConstant.SHAPE_ROUNDED_RECT](boxSize) {
    const rx = 5, ry = 5;
    const roundR = DefaultStyle.topicShapeStyle.roundedRectR;
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

  [CommonConstant.SHAPE_PARALLELOGRAM](boxSize) {
    const {width, height} = boxSize;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const cutLength = height / DefaultStyle.topicShapeStyle.parallelogramSlope;

    const topicShapePath = `M ${-halfWidth + cutLength} ${-halfHeight} h ${width - cutLength} ` +
      `L ${halfWidth - cutLength} ${halfHeight} h ${cutLength - width} Z`;

    const topicSelectBoxPath = getSelectBoxPath(boxSize);

    return { topicShapePath, topicSelectBoxPath };
  }
}