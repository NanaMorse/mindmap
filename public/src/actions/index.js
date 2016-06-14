import * as types from '../constants/ActionTypes';

// Topic Action
export const updateTopicText = (text) => {
  return {
    type : types.UPDATE_TOPIC_TEXT,
    text
  }
};

export const updateTopicFontSize = (fontSize) => {
  return {
    type : types.UPDATE_TOPIC_FONTSIZE,
    fontSize
  }
};

export const updateTopicShapeClass = (shapeClass) => {
  return {
    type : types.UPDATE_TOPIC_SHAPECLASS,
    shapeClass
  }
};

export const updateTopicFillColor = (bgColor) => {
  return {
    type : types.UPDATE_TOPIC_FILLCOLOR,
    bgColor
  }
};