import * as types from '../constants/ActionTypes';

import {deepClone} from '../apptools/commonfunc';

export default (currentState = {}, action) => {

  const topicsCopy = deepClone(currentState);

  const {topicInfo: targetTopicInfo, parentInfo: targetParentInfo} = findTopicInfoById(topicsCopy, action.id) || {topicInfo: null, parentInfo: null};

  switch (action.type) {
    case types.UNDO :
    {
      return action.pastState;
    }

    case types.REDO :
    {
      return action.futureState;
    }

    case types.UPDATE_TOPIC_TITLE :
    {
      targetTopicInfo.title = action.title;
      break;
    }

    case types.UPDATE_TOPIC_FONTSIZE :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.fontSize = action.fontSize;
      break;
    }

    case types.UPDATE_TOPIC_FONTCOLOR :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.fontColor = action.fontColor;
      break;
    }

    case types.UPDATE_TOPIC_ISFONTBOLD :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.isFontBold = action.isFontBold;
      break;
    }

    case types.UPDATE_TOPIC_ISFONTITALIC :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.isFontItalic = action.isFontItalic;
      break;
    }

    case types.UPDATE_TOPIC_ISFONTLINETHROUGH :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.isFontLineThrough = action.isFontLineThrough;
      break;
    }

    case types.UPDATE_TOPIC_SHAPECLASS :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.shapeClass = action.shapeClass;
      break;
    }

    case types.UPDATE_TOPIC_LINECLASS :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.lineClass = action.lineClass;
      break;
    }

    case types.UPDATE_TOPIC_FILLCOLOR :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.fillColor = action.fillColor;
      break;
    }

    case types.UPDATE_TOPIC_LABEL :
    {
      if (action.labelText) targetTopicInfo.label = action.labelText;
      else delete targetTopicInfo.label;
      break;
    }

    case types.ADD_CHILD_TOPIC :
    {
      targetTopicInfo.children = targetTopicInfo.children || [];
      const length = targetTopicInfo.children.length;
      targetTopicInfo.children.splice(action.index == null ? length : action.index, 0, action.childInfo);
      break;
    }

    case types.Add_PARENT_TOPIC :
    {
      // remove self info
      const selfIndex = targetParentInfo.children.indexOf(targetTopicInfo);
      targetParentInfo.children.splice(selfIndex, 1);

      // generate new parent info
      const newParent = {
        id: action.parentId,
        children: [targetTopicInfo]
      };

      // add a new parent to old parent
      targetParentInfo.children.splice(selfIndex, 0, newParent);
      break;
    }

    case types.REM_SELF_TOPIC :
    {
      targetParentInfo.children.splice(targetParentInfo.children.indexOf(targetTopicInfo), 1);
      break;
    }

    default :
    {
      return currentState;
    }
  }

  return topicsCopy;
};

function findTopicInfoById(topic, id, parentInfo?) {
  if (!topic || !id) return;

  if (topic.id === id) return {topicInfo: topic, parentInfo};

  if (topic.children) {
    for (const childTopic of topic.children) {
      const {topicInfo, parentInfo} = findTopicInfoById(childTopic, id, topic) || {topicInfo: null, parentInfo: null};
      if (topicInfo) return {topicInfo, parentInfo};
    }
  }
}