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

export const updateTopicFontColor = (id, fontColor) => {
  return {
    type: types.UPDATE_TOPIC_FONTCOLOR,
    id,
    fontColor
  }
};

export const updateTopicIsFontBold = (id, isFontBold) => {
  return {
    type: types.UPDATE_TOPIC_ISFONTBOLD,
    id,
    isFontBold
  }
};

export const updateTopicIsFontItalic = (id, isFontItalic) => {
  return {
    type: types.UPDATE_TOPIC_ISFONTITALIC,
    id,
    isFontItalic
  }
};

export const updateTopicIsFontLineThrough = (id, isFontLineThrough) => {
  return {
    type: types.UPDATE_TOPIC_ISFONTLINETHROUGH,
    id,
    isFontLineThrough
  }
};

export const updateTopicShapeClass = (id, shapeClass) => {
  return {
    type: types.UPDATE_TOPIC_SHAPECLASS,
    id,
    shapeClass
  }
};

export const updateTopicLineClass = (id, lineClass) => {
  return {
    type: types.UPDATE_TOPIC_LINECLASS,
    id,
    lineClass
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

export const addChildTopic = (id, childInfo, index) => {
  return {
    type: types.ADD_CHILD_TOPIC,
    id,
    childInfo,
    index
  }
};

export const addParentTopic = (id, parentId) => {
  return {
    type: types.Add_PARENT_TOPIC,
    id,
    parentId
  }
};

export const removeSelfTopic = (id) => {
  return {
    type: types.REM_SELF_TOPIC,
    id
  }
};