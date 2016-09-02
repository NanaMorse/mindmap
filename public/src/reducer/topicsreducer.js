import * as types from '../constants/ActionTypes';

import {deepClone} from '../apptools';

export default (currentState = {}, action) => {
  
  const topicsCopy = deepClone(currentState);
  
  const {topicInfo: targetTopicInfo, parentInfo: targetParentInfo} = findTopicInfoById(topicsCopy, action.id) || {};

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
      targetTopicInfo.children.push({id: action.childId});
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

function findTopicInfoById(topic, id, parentInfo) {
  if (!topic || !id) return;
  
  if (topic.id === id) return {topicInfo: topic, parentInfo};

  if (topic.children) {
    for (const childTopic of topic.children) {
      const {topicInfo, parentInfo} = findTopicInfoById(childTopic, id, topic) || {};
      if (topicInfo) return {topicInfo, parentInfo};
    }
  }
}