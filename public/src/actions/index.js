import * as types from '../constants/ActionTypes';

// Sheet Action
export const updateSheetFillColor = (fillColor) => {
  return {
    type : types.UPDATE_SHEET_FILLCOLOR,
    fillColor
  }
};

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

export const updateTopicFillColor = (fillColor) => {
  return {
    type : types.UPDATE_TOPIC_FILLCOLOR,
    fillColor
  }
};