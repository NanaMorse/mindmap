import * as types from '../constants/ActionTypes';

// Undo Action
export const undo = (pastState) => {
  return {
    type: types.UNDO,
    pastState
  }
};

export const redo = (futureState) => {
  return {
    type: types.REDO,
    futureState
  }
};

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

export const updateTopicShapeClass = (id, shapeClass) => {
  return {
    type: types.UPDATE_TOPIC_SHAPECLASS,
    id,
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

export const updateTopicLabel = (id, labelText) => {
  return {
    type: types.UPDATE_TOPIC_LABEL,
    id,
    labelText
  }
};

export const addChildTopic = (id, childId) => {
  return {
    type: types.ADD_CHILD_TOPIC,
    id,
    childId
  }
};

export const removeSelfTopic = (id) => {
  return {
    type: types.REM_SELF_TOPIC,
    id
  }
};