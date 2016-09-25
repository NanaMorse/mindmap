import * as types from '../constants/ActionTypes';

interface action {
  (...param: any[]): {
    type: string
  }
}

// Sheet Action
export const sheetUndo:action = (pastState: Object) => {
  return {
    type: types.SHEET_UNDO,
    pastState
  }
};

export const sheetRedo:action = (futureState: Object) => {
  return {
    type: types.SHEET_REDO,
    futureState
  }
};

export const updateSheetBgColor:action = (bgColor: string) => {
  return {
    type: types.UPDATE_SHEET_BGCOLOR,
    bgColor
  }
};

export const updateSheetInfoItemMode = (infoItem: string, mode: string) => {
  return {
    type: types.UPDATE_SHEET_INFO_ITEM_MODE,
    infoItem,
    mode
  }
};

// Topic Action
export const topicsUndo:action = (pastState: Object) => {
  return {
    type: types.TOPICS_UNDO,
    pastState
  }
};

export const topicsRedo:action = (futureState: Object) => {
  return {
    type: types.TOPICS_REDO,
    futureState
  }
};

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

export const updateTopicStrokeWidth:action = (id: string, strokeWidth: string) => {
  return {
    type: types.UPDATE_TOPIC_STROKEWIDTH,
    id,
    strokeWidth
  }
};

export const updateTopicStrokeColor:action = (id: string, strokeColor: string) => {
  return {
    type: types.UPDATE_TOPIC_STROKECOLOR,
    id,
    strokeColor
  }
};

export const updateTopicLineClass:action = (id: string, lineClass: string) => {
  return {
    type: types.UPDATE_TOPIC_LINECLASS,
    id,
    lineClass
  }
};

export const updateTopicLineWidth:action = (id: string, lineWidth: string) => {
  return {
    type: types.UPDATE_TOPIC_LINEWIDTH,
    id,
    lineWidth
  }
};

export const updateTopicLineColor:action = (id: string, lineColor: string) => {
  return {
    type: types.UPDATE_TOPIC_LINECOLOR,
    id,
    lineColor
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