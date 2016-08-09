import * as types from '../constants/ActionTypes';

import {deepAssign} from '../apptools';

export default (currentState = {}, action) => {

  const feedCopy = deepAssign({}, currentState.feed);
  
  const targetTopicFeed = findTopicInfoById(feedCopy, action.id);

  switch (action.type) {
    case types.UNDO :
    {
      return deepAssign({}, currentState, action.pastState);
    }
      
    case types.REDO :
    {
      return deepAssign({}, currentState, action.futureState);
    }

    case types.UPDATE_TOPIC_TITLE :
    {
      targetTopicFeed.title = action.title;
      break;
    }

    case types.UPDATE_TOPIC_FONTSIZE :
    {
      targetTopicFeed.style = targetTopicFeed.style || {};
      targetTopicFeed.style.fontSize = action.fontSize;
      break;
    }

    case types.UPDATE_TOPIC_FILLCOLOR :
    {
      targetTopicFeed.style = targetTopicFeed.style || {};
      targetTopicFeed.style.fillColor = action.fillColor;
      break;
    }

    default :
    {
      return currentState;
    }
  }

  return deepAssign({}, currentState, {
    feed : feedCopy
  });
};

function findTopicInfoById(feed, id) {
  if (feed.id === id) return feed;

  if (feed.children) {
    for (const childFeed of feed.children) {
      const topicInfo = findTopicInfoById(childFeed, id);
      if (topicInfo) return topicInfo;
    }
  }
}