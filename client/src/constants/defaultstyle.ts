import { TopicType, TopicShapeType, LineType } from './common';

/**
 * @description topic默认样式
 * */
export const TopicStyle = {

  [TopicType.ROOT]: {
    fontSize: 24,
    fontColor: "#4c4c4c",
    isFontBold: true,
    shapeClass: TopicShapeType.ROUNDED_RECT,
    strokeWidth: 1,
    strokeColor: "#000000",
    lineClass: LineType.ROUNDED,
    lineWidth: 1,
    lineColor: "#7f7f7f",
    fillColor: "#cbdefd"
  },

  [TopicType.MAIN]: {
    fontSize: 18,
    fontColor: "#4c4c4c",
    isFontBold: true,
    shapeClass: TopicShapeType.ROUNDED_RECT,
    strokeWidth: 1,
    strokeColor: "#000000",
    lineClass: LineType.RIGHT_ANGLE,
    lineWidth: 1,
    lineColor: "#7f7f7f",
    fillColor: "#fef4ec"
  },

  [TopicType.SUB]: {
    fontSize: 16,
    fontColor: "#4c4c4c",
    isFontBold: true,
    shapeClass: TopicShapeType.ROUNDED_RECT,
    strokeWidth: 1,
    strokeColor: "#000000",
    lineClass: LineType.RIGHT_ANGLE,
    lineWidth: 1,
    lineColor: "#7f7f7f",
    fillColor: "#fef4ec"
  }
};

/**
 * @description label默认样式
 * */
export const LabelStyle = {
  fontSize: 12,
  fillColor: '#edf9cc',
  padding: 5
};

/**
 * @description 连接线默认样式
 * */
export const LineStyle = {
  stroke: '#7f7f7f'
};

/**
 * @description topic文本输入框默认样式
 * */
export const TopicEditorStyle = {
  minWidth: 100,
  minHeight: 20
};

/**
 * @description 选择框的颜色
 * */
export const SelectBoxColor = {
  HOVER: 'rgb(199, 217, 231)',
  SELECTED: 'rgb(75, 111, 189)'
};

/**
 * @description topic选择框与topic之间的间距
 * */
export const selectBoxSpace = 5;

/**
 * @description topic形状相关的一些特殊数据
 * */
export const TopicShapeSpecialData = {
  // 菱形的斜率
  parallelogramSlope: 2.5,
  // 圆角矩形的圆角半径
  roundedRectR: 5
};