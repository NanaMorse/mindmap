import * as types from '../constants/ActionTypes';

import {deepClone} from '../apptools/commonfunc';

export default (currentState = {}, action) => {

  const topicsCopy = deepClone(currentState);

  const {topicInfo: targetTopicInfo, parentInfo: targetParentInfo} = findTopicInfoById(topicsCopy, action.id) || {topicInfo: null, parentInfo: null};

  function changeStyle(styleKey: string) {
    targetTopicInfo.style = targetTopicInfo.style || {};
    targetTopicInfo.style[styleKey] = action[styleKey];
  }

  switch (action.type) {
    case types.TOPICS_UNDO :
    {
      return action.pastState;
    }

    case types.TOPICS_REDO :
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
      changeStyle('fontSize');
      break;
    }

    case types.UPDATE_TOPIC_FONTCOLOR :
    {
      changeStyle('fontColor');
      break;
    }

    case types.UPDATE_TOPIC_ISFONTBOLD :
    {
      changeStyle('isFontBold');
      break;
    }

    case types.UPDATE_TOPIC_ISFONTITALIC :
    {
      changeStyle('isFontItalic');
      break;
    }

    case types.UPDATE_TOPIC_ISFONTLINETHROUGH :
    {
      changeStyle('isFontLineThrough');
      break;
    }

    case types.UPDATE_TOPIC_SHAPECLASS :
    {
      changeStyle('shapeClass');
      break;
    }

    case types.UPDATE_TOPIC_STROKEWIDTH :
    {
      changeStyle('strokeWidth');
      break;
    }

    case types.UPDATE_TOPIC_STROKECOLOR :
    {
      changeStyle('strokeColor');
      break;
    }

    case types.UPDATE_TOPIC_LINECLASS :
    {
      changeStyle('lineClass');
      break;
    }
      
    case types.UPDATE_TOPIC_LINEWIDTH :
    {
      changeStyle('lineWidth');
      break;
    }

    case types.UPDATE_TOPIC_LINECOLOR :
    {
      changeStyle('lineColor');
      break;
    }

    case types.UPDATE_TOPIC_FILLCOLOR :
    {
      changeStyle('fillColor');
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
      // remove selfs info
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