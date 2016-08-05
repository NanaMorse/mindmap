import * as types from '../constants/ActionTypes';

// Sheet Action
export const updateSheetBgColor = (bgColor) => {
  return {
    type: types.UPDATE_SHEET_BGCOLOR,
    bgColor
  }
};

// Topic Action
export const updateTopicText = (id, text) => {
  return {
    type: types.UPDATE_TOPIC_TEXT,
    id,
    text
  }
};

export const updateTopicFontSize = (id, fontSize) => {
  return {
    type: types.UPDATE_TOPIC_FONTSIZE,
    id,
    fontSize
  }
};

export const updateTopicShapeClass = (shapeClass) => {
  return {
    type: types.UPDATE_TOPIC_SHAPECLASS,
    shapeClass
  }
};

export const updateTopicFillColor = (id, fillColor) => {
  return {
    type: types.UPDATE_TOPIC_FILLCOLOR,
    id,
    fillColor
  }
};