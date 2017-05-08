import { deepClone, generateUUID } from 'src/apptools/commonfunc'
import { topicExtendedInfoMap } from 'src/managers'
import { TopicType, LayoutType } from 'src/constants/common';
import { mapState, topicInfo, extendTopicInfo } from 'src/interface'

/**
 * @todo
 * 1：复制黏贴功能
 * 2：鼠标框选功能
 * 3：undo与redo功能
 * 4：socket共享功能
 * 5：共享编辑锁功能
 * */

class TopicTreeWalkHelper {

  /**
   * @param topicTreeToSearch the search area to find target topic
   * @param targetId search target's uuid
   * */
  public findTopicInfoById(topicTreeToSearch: topicInfo, targetId: string): topicInfo {
    if (targetId === topicTreeToSearch.id) return topicTreeToSearch;

    if (topicTreeToSearch.children) {
      for (const childTopic of topicTreeToSearch.children) {
        const topicInfo = this.findTopicInfoById(childTopic, targetId);
        if (topicInfo) return topicInfo;
      }
    }
  }

  /**
   * @description filter selection array
   * */
  public getSelectionsArrayWithoutChild(topicTreeInfo: topicInfo, selectionList: Array<extendTopicInfo>): Array<extendTopicInfo> {
    const isAAncestorOfB = this.getAncestorCheckMethod(topicTreeInfo, selectionList);

    return selectionList.filter((selectionB) => {
      return !selectionList.some((selectionA) => {
        return isAAncestorOfB(selectionA, selectionB);
      }) && selectionB.type !== TopicType.ROOT;
    });
  }

  private getAncestorCheckMethod(topicTreeInfo: topicInfo, selectionList: Array<extendTopicInfo>) {
    const ancestorMap = {};

    selectionList.forEach((selection) => {
      getSelectionsAncestorList(selection);
    });

    return function (selectionA: topicInfo, selectionB: topicInfo) {
      return selectionA.id !== topicTreeInfo.id && ancestorMap[selectionB.id].includes(selectionA.id);
    };

    function getSelectionsAncestorList(selection: topicInfo) {
      const targetId = selection.id;
      const targetList = ancestorMap[targetId] = [];

      if (targetId === topicTreeInfo.id) return;

      search();

      function search(searchSource = topicTreeInfo) {
        if (!searchSource.children) return;

        for (const childTopic of searchSource.children) {
          if (childTopic.id === targetId) {
            targetList.push(searchSource.id);
            return true;
          }

          targetList.push(searchSource.id);

          if (search(childTopic)) {
            return true;
          }

          targetList.pop();
        }
      }
    }
  }

  /**
   * @description update the topic info in selection list and topic tree
   * */
  public updateEverySelectionSelfInfo(topicTreeInfo: topicInfo, selectionList: Array<string>, process: (selectionInfo: topicInfo) => any) {
    const topicTreeCopy = deepClone(topicTreeInfo);
    const selectionListCopy = deepClone(selectionList);

    selectionListCopy.forEach(id => {
      const topicInfoInTree = this.findTopicInfoById(topicTreeCopy, id);
      topicInfoInTree.style = topicInfoInTree.style || {};
      process(topicInfoInTree);
    });

    return { topicTree: topicTreeCopy, selectionList: selectionListCopy }
  }

  public updateSingleSelectionSelfInfo(topicTreeInfo: topicInfo, selectionList: Array<string>, process: (selectionInfo: topicInfo) => any) {
    const topicTreeCopy = deepClone(topicTreeInfo);
    const selectionListCopy = deepClone(selectionList);
    const targetTopicInTree = this.findTopicInfoById(topicTreeCopy, selectionListCopy[selectionListCopy.length - 1]);

    process(targetTopicInTree);

    return { topicTree: topicTreeCopy, selectionList: selectionListCopy }
  }
}

const topicTreeWalkHelper = new TopicTreeWalkHelper();


/**
 * @description reducers about selections manager
 */
const selectionsReducer = {

  /**
   * @description set only one topic selected
   * @param state
   * @param id selected topic's id
   */
  setSingleSelection(state: mapState, { id }: { id: string }): mapState {
    return { ...state, selectionList: [id] }
  },

  /**
   * @description add a new selection to list
   * @param state
   * @param id selected topic's id
   */
  addSelectionToList(state: mapState, { id }: { id: string }): mapState {
    const selectionListCopy = deepClone(state.selectionList);
    // push that topic into selection list
    selectionListCopy.push(id);

    return { ...state, selectionList: selectionListCopy }
  },

  /**
   * @description remove one topic from selectionList, triggered when ctrl + click on a selected topic
   */
  removeSelectionFromList(state: mapState, { id }: { id: string }): mapState {
    const selectionListCopy = deepClone(state.selectionList);
    selectionListCopy.splice(selectionListCopy.indexOf(id), 1);

    return { ...state, selectionList: selectionListCopy }
  },

  /**
   * @description clear selectionList, no topic was selected
   */
  clearSelectionList(state: mapState): mapState {
    return { ...state, selectionList: [] }
  }
};

/**
 * @description reducers about editing topic tree, such as adding child topic, or removing topic self
 * */
const topicTreeEditReducer = {

  /**
   * @description attach a new topic as current selection's child topic
   * */
  addChildTopic(state: mapState): mapState {
    const { selectionList } = state;
    const topicTreeCopy = deepClone(state.topicTree);
    const targetTopicTree = topicTreeWalkHelper.findTopicInfoById(topicTreeCopy, selectionList[selectionList.length - 1]);

    // only add child topic for the latest selection topic
    targetTopicTree.children = targetTopicTree.children || [];
    const childLength = targetTopicTree.children.length;
    targetTopicTree.children.splice(childLength, 0, { id: generateUUID() });

    return { ...state, topicTree: topicTreeCopy }
  },

  /**
   * @description attach a new topic before selection's index
   * */
  addTopicBefore(state: mapState): mapState {
    const { selectionList } = state;
    const topicTreeCopy = deepClone(state.topicTree);
    const targetTopicInfo = topicExtendedInfoMap[selectionList[selectionList.length - 1]];
    const parentTopicTreeInfo = topicTreeWalkHelper.findTopicInfoById(topicTreeCopy, targetTopicInfo.parentId);

    // add a new topic into selection's left hand place
    parentTopicTreeInfo.children.splice(targetTopicInfo.index, 0, { id: generateUUID() });

    return { ...state, topicTree: topicTreeCopy }
  },

  /**
   * @description just like the method "addTopicBefore"
   * */
  addTopicAfter(state: mapState): mapState {
    const { selectionList } = state;
    const topicTreeCopy = deepClone(state.topicTree);
    const targetTopicTreeInfo = topicExtendedInfoMap[selectionList[selectionList.length - 1]];
    const parentTopicTreeInfo = topicTreeWalkHelper.findTopicInfoById(topicTreeCopy, targetTopicTreeInfo.parentId);

    // add a new topic into selection's right hand place
    parentTopicTreeInfo.children.splice(targetTopicTreeInfo.index + 1, 0, { id: generateUUID() });

    return { ...state, topicTree: topicTreeCopy }
  },

  /**
   * @description append a new topic as selection's parent
   * */
  addParentTopic(state: mapState): mapState {
    const selectionListCopy = deepClone(state.selectionList);
    const targetTopicTreeInfo = topicExtendedInfoMap[selectionListCopy[selectionListCopy.length - 1]];

    const topicTreeCopy = deepClone(state.topicTree);
    // find the selected topic's current parent
    const parentTopicTreeInfo = topicTreeWalkHelper.findTopicInfoById(topicTreeCopy, targetTopicTreeInfo.parentId);
    // remove the selection, has attach a new topic with a special child
    parentTopicTreeInfo.children.splice(targetTopicTreeInfo.index, 1, {
      id: generateUUID(),
      children: [targetTopicTreeInfo.originTopicInfo]
    });

    return { ...state, topicTree: topicTreeCopy }
  },


  /**
   * @description remove topic, all selected topic will be removed
   * */
  removeTopic(state: mapState): mapState {
    const selectionListCopy = deepClone(state.selectionList);
    const topicTreeCopy = deepClone(state.topicTree);

    const selectionListWithoutChild = topicTreeWalkHelper
      .getSelectionsArrayWithoutChild(topicTreeCopy, selectionListCopy.map(id => topicExtendedInfoMap[id]));

    selectionListWithoutChild.forEach((selectionInfo) => {
      const selectionParent = topicTreeWalkHelper.findTopicInfoById(topicTreeCopy, selectionInfo.parentId);
      // remove topic from parent's child list
      selectionParent.children.splice(selectionInfo.index, 1);
    });

    // clear selectionList
    return { ...state, topicTree: topicTreeCopy, selectionList: [] }
  }
};

const topicTextEditReducer = {

  setTitle(state: mapState, { title }: { title: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateSingleSelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.title = title;
      })
    };
  },

  setFontSize(state: mapState, { fontSize }: { fontSize: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.fontSize = fontSize;
      })
    };
  },

  setFontColor(state: mapState, { fontColor }: { fontColor: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.fontColor = fontColor;
      })
    };
  },

  setIsFontBold(state: mapState, { isFontBold }: { isFontBold: boolean }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.isFontBold = isFontBold;
      })
    };
  },

  setIsFontItalic(state: mapState, { isFontItalic }: { isFontItalic: boolean }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.isFontItalic = isFontItalic;
      })
    };
  },

  setIsFontLineThrough(state: mapState, { isFontLineThrough }: { isFontLineThrough: boolean }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.isFontLineThrough = isFontLineThrough;
      })
    };
  },
};

const topicShapeStyleEditReducer = {
  setShapeClass(state: mapState, { shapeClass }: { shapeClass: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.shapeClass = shapeClass;
      })
    };
  },

  setFillColor(state: mapState, { fillColor }: { fillColor: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.fillColor = fillColor;
      })
    };
  },

  setBorderWidth(state: mapState, { borderWidth }: { borderWidth: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.strokeWidth = borderWidth;
      })
    };
  },

  setBorderColor(state: mapState, { borderColor }: { borderColor: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.strokeColor = borderColor;
      })
    };
  }
};

const connectLineStyleEditReducer = {
  setLineClass(state: mapState, { lineClass }: { lineClass: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.lineClass = lineClass;
      })
    };
  },

  setLineWidth(state: mapState, { lineWidth }: { lineWidth: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.lineWidth = lineWidth;
      })
    };
  },

  setLineColor(state: mapState, { lineColor }: { lineColor: string }): mapState {
    return {
      ...state,
      ...topicTreeWalkHelper.updateEverySelectionSelfInfo(state.topicTree, state.selectionList, (selectionInfo) => {
        selectionInfo.style.lineColor = lineColor;
      })
    };
  },
};

const mapModel = {
  namespace: 'map',

  state: <mapState>{
    topicTree: {},
    selectionList: [],
    mapStructure: LayoutType.LOGIC_TO_RIGHT
  },

  reducers: Object.assign({},
    selectionsReducer, topicTreeEditReducer,
    topicTextEditReducer, topicShapeStyleEditReducer,
    connectLineStyleEditReducer
  )
};

export default mapModel