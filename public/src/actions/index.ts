import * as types from '../constants/ActionTypes';

interface action {
  (...param: any[]): {
    type: string
  }
}

// Undo Action
export const undo:action = (pastState: Object) => {
  return {
    type: types.UNDO,
    pastState
  }
};

export const redo:action = (futureState: Object) => {
  return {
    type: types.REDO,
    futureState
  }
};

// Sheet Action
export const updateSheetBgColor:action = (bgColor: string) => {
  return {
    type: types.UPDATE_SHEET_BGCOLOR,
    bgColor
  }
};

// Topic Action
export const updateTopicTitle:action = (id: string, title: string) => {
  return {
    type: types.UPDATE_TOPIC_TITLE,
    id,
    title
  }
};

export const updateTopicFontSize:action = (id: string, fontSize: string) => {
  return {
    type: types.UPDATE_TOPIC_FONTSIZE,
    id,
    fontSize
  }
};

export const updateTopicFontColor:action = (id: string, fontColor: string) => {
  return {
    type: types.UPDATE_TOPIC_FONTCOLOR,
    id,
    fontColor
  }
};

export const updateTopicIsFontBold:action = (id: string, isFontBold: boolean) => {
  return {
    type: types.UPDATE_TOPIC_ISFONTBOLD,
    id,
    isFontBold
  }
};

export const updateTopicIsFontItalic:action = (id: string, isFontItalic: boolean) => {
  return {
    type: types.UPDATE_TOPIC_ISFONTITALIC,
    id,
    isFontItalic
  }
};

export const updateTopicIsFontLineThrough:action = (id: string, isFontLineThrough: boolean) => {
  return {
    type: types.UPDATE_TOPIC_ISFONTLINETHROUGH,
    id,
    isFontLineThrough
  }
};

export const updateTopicShapeClass:action = (id: string, shapeClass: string) => {
  return {
    type: types.UPDATE_TOPIC_SHAPECLASS,
    id,
    shapeClass
  }
};

export const updateTopicLineClass:action = (id: string, lineClass: string) => {
  return {
    type: types.UPDATE_TOPIC_LINECLASS,
    id,
    lineClass
  }
};

export const updateTopicFillColor:action = (id: string, fillColor: string) => {
  return {
    type: types.UPDATE_TOPIC_FILLCOLOR,
    id,
    fillColor
  }
};

export const updateTopicLabel:action = (id: string, labelText: string) => {
  return {
    type: types.UPDATE_TOPIC_LABEL,
    id,
    labelText
  }
};

export const addChildTopic:action = (id: string, childInfo: Object, index: number) => {
  return {
    type: types.ADD_CHILD_TOPIC,
    id,
    childInfo,
    index
  }
};

export const addParentTopic:action = (id: string, parentId: string) => {
  return {
    type: types.Add_PARENT_TOPIC,
    id,
    parentId
  }
};

export const removeSelfTopic:action = (id: string) => {
  return {
    type: types.REM_SELF_TOPIC,
    id
  }
};