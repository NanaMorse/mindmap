import { deepClone } from 'src/apptools/commonfunc'
import { mapState, topicInfo, extendTopicInfo } from 'src/interface'

/**
 * @param topicTreeToSearch the search area to find target topic
 * @param targetId search target's uuid
 * */
function findTopicInfoById(topicTreeToSearch: topicInfo, targetId: string): topicInfo {
  if (targetId === topicTreeToSearch.id) return topicTreeToSearch;

  if (topicTreeToSearch.children) {
    for (const childTopic of topicTreeToSearch.children) {
      const topicInfo = findTopicInfoById(childTopic, targetId);
      if (topicInfo) return topicInfo;
    }
  }
}

/**
 * @description reducers about selections manager
 */
const selectionsReducer = {

  /**
   * @description set only one topic selected
   * @param state
   * @param topicInfo selected topic's extended info
   */
  setSingleSelection(state: mapState, { topicInfo }: { topicInfo: extendTopicInfo }): mapState {
    return { ...state, selectionList: [topicInfo] }
  },

  /**
   * @description add a new selection to list
   * @param state
   * @param topicInfo selected topic's extended info
   */
  addSelectionToList(state: mapState, { topicInfo }: { topicInfo: extendTopicInfo }): mapState {
    const selectionListCopy = deepClone(state.selectionList);
    // push that topic into selection list
    selectionListCopy.push(topicInfo);

    return { ...state, selectionList: selectionListCopy }
  },

  /**
   * @description remove one topic from selectionList, triggered when ctrl + click on a selected topic
   */
  removeSelectionFromList(state: mapState, { targetId }: { targetId: string }): mapState {
    const selectionListCopy = deepClone(state.selectionList);
    const removedTargetIndex = selectionListCopy.findIndex(selectionInfo => selectionInfo.id === targetId);
    selectionListCopy.splice(removedTargetIndex, 1);

    return { ...state, selectionList: selectionListCopy }
  },

  /**
   * @description clear selectionList, no topic was selected
   */
  clearSelectionList(state: mapState): mapState {
    return { ...state, selectionList: [] }
  }
};

const mapModel = {
  namespace: 'map',

  state: {
    topicTree: {},
    selectionList: []
  },

  reducers: Object.assign({}, selectionsReducer)
};

export default mapModel