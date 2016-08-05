import * as types from '../constants/ActionTypes';

// Sheet Action
export const updateSheetBgColor = (bgColor) => {
  return {
    type: types.UPDATE_SHEET_BGCOLOR,
    bgColor
  }
};

// Topic Action
export const updateTopicTitle = (id, title) => {
  return {
    type: types.UPDATE_TOPIC_TITLE,
    id,
    title
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

export const addChildTopic = (id) => {
  return {
    type: types.ADD_CHILD_TOPIC,
    id
  }
};