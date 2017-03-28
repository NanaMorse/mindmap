import { deepClone } from 'src/apptools/commonfunc'
import { mapState, topicInfo } from 'src/interface'

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

const mapModel = {
  namespace: 'map',

  state: {
    treeData: {},
    targetTree: null
  },

  reducers: {
    /**
     * @description update current selected topic info
     * @param targetId selected topic's id
     */
    updateTargetTree(state: mapState, { targetId }: { targetId: string }) {
      const treeDataCopy = deepClone(state.treeData);
      let targetTree;
      // if targetId is null, clear selected topic info
      if (!targetId) targetTree = null;
      else targetTree = findTopicInfoById(treeDataCopy, targetId);
      return { ...state, targetTree };
    },

    updateTopicTitle(state: mapState, title: string) {
      return state
    },

    updateTopicFontSize(state: mapState, fontSize: number) {
      return state
    },

    updateTopicTextColor(state: mapState, textColor: string) {
      return state
    },

    updateTopicIsTextBold(state: mapState, isTextBold: boolean) {
      return state
    },

    updateTopicIsTextItalic(state: mapState, isTextItalic: boolean) {

    },

    updateTopicIsTextLineThrough(state: mapState, isTextLineThrough: boolean) {
      return state
    },

    updateTopicShapeClass(state: mapState, shapeClass: string) {
      return state
    },

    updateTopicBorderWidth(state: mapState, borderWidth: number) {
      return state
    },

    updateTopicBorderColor(state: mapState, borderColor: string) {
      return state
    },

    updateTopicLineClass(state: mapState, lineClass: string) {
      return state
    },

    updateTopicLineWidth(state: mapState, lineWidth: number) {
      return state
    },

    updateTopicLineColor(state: mapState, lineColor: string) {
      return state
    },

    updateTopicFillColor(state: mapState, fillColor: string) {

    },

    updateTopicLabelText(state: mapState, labelText: string) {
      return state
    },

    addChildTopic(state: mapState, index: number) {
      return state
    },

    addParentTopic(state: mapState, parentId: string) {
      return state
    },

    removeSelf(state: mapState) {
      return state
    }
  }
};

export default mapModel