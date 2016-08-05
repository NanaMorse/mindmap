import * as types from '../constants/ActionTypes';

import {deepAssign} from '../apptools';

export default (currentState = {}, action) => {

  const feedCopy = deepAssign({}, currentState.feed);

  const _findTopicInfoById = findTopicInfoById.bind(null, feedCopy);

  switch (action.type) {
    case types.UPDATE_TOPIC_TITLE :
    {
      _findTopicInfoById(action.id).title = action.title;

      console.log('test');
      
      return deepAssign({}, currentState, {
        feed : feedCopy
      });
    }

    case types.UPDATE_TOPIC_FONTSIZE :
    {
      return deepAssign({}, currentState, {
        topicById: {
          [action.id]: {
            style: {
              fontSize: action.fontSize
            }
          }
        }
      });
    }

    case types.UPDATE_TOPIC_FILLCOLOR :
    {
      return deepAssign({}, currentState, {
        topicById: {
          [action.id]: {
            style: {
              fillColor: action.fillColor
            }
          }
        }
      });
    }

    default :
    {
      return currentState;
    }
  }
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