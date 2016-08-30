import * as types from '../constants/ActionTypes';

import {deepAssign} from '../apptools';

export default (currentState = {}, action) => {
  
  const stateCopy = deepAssign({}, currentState);

  const feedCopy = stateCopy.feed;
  
  const {topicInfo: targetTopicInfo, parentInfo: targetParentInfo} = findTopicInfoById(feedCopy, action.id) || {};

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

    case types.UPDATE_TOPIC_SHAPECLASS :
    {
      targetTopicInfo.style = targetTopicInfo.style || {};
      targetTopicInfo.style.shapeClass = action.shapeClass;
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
  
  return stateCopy;
};

function findTopicInfoById(feed, id, parentInfo) {
  if (!feed || !id) return;
  
  if (feed.id === id) return {topicInfo: feed, parentInfo};

  if (feed.children) {
    for (const childFeed of feed.children) {
      const {topicInfo, parentInfo} = findTopicInfoById(childFeed, id, feed) || {};
      if (topicInfo) return {topicInfo, parentInfo};
    }
  }
}