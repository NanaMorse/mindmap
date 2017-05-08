import * as React from 'react';
import { connect } from 'dva'
import Topic from './Topic';
const Draggable = require('react-draggable');
import { TopicType, TopicStrokeWidthType, InfoItemMode } from 'src/constants/common';
import { deepClone, getTextSize } from 'src/apptools/commonfunc';
import layoutTopics from 'src/layout';
import { LabelStyle, TopicStyle } from 'src/constants/defaultstyle';
import * as Distance from 'src/constants/distance';
import { topicExtendedInfoMap } from 'src/managers'
import { mapState, appState, topicInfo, extendTopicInfo } from 'src/interface'

interface MapProps {
  map: mapState
  app: appState
  /**
   * @description mindmap缩放值
   * */
  scaleValue: number
}

class Map extends React.Component<MapProps, void> {

  /**
   * @description get extended topics info, including the parentId, position, boxSize, it's type, and so on
   * @param topicInfo the topic info tree to extended
   * */
  calcExtendedTopicTreeInfo(topicInfo: topicInfo): extendTopicInfo {
    // copy as return value
    const topicInfoCopy: extendTopicInfo = deepClone(topicInfo) as extendTopicInfo;

    // set origin info
    topicInfoCopy.originTopicInfo = deepClone(topicInfo);

    // set topic's info about parent
    this.setTopicInfoAboutParent(topicInfoCopy);

    // mix style with default setting
    topicInfoCopy.style = Object.assign({}, TopicStyle[topicInfoCopy.type], topicInfoCopy.style);

    this.setTopicSizeInfo(topicInfoCopy);

    topicInfo.children && (topicInfoCopy.children = topicInfo.children.map(childTopic => this.calcExtendedTopicTreeInfo(childTopic)));

    // save extended topic info
    topicExtendedInfoMap[topicInfoCopy.id] = deepClone(topicInfoCopy);

    return topicInfoCopy;
  }

  /**
   * @param topicInfo the topic to find parent
   * @param treeLevelToCheck the check level of current check traversal, the start level is the ROOT level
   * @return the parent topic info of a topic node
   * */
  getParentOfTopicNode(topicInfo: topicInfo, treeLevelToCheck: topicInfo = this.props.map.topicTree): topicInfo {
    // if the topicInfo to check is the current check level, it means this topic is the ROOT topic
    if (topicInfo.id === treeLevelToCheck.id) return;
    // start traversing
    const children = treeLevelToCheck.children;
    if (children) {
      for (const childTreeToCheck of children) {
        if (topicInfo.id === childTreeToCheck.id) return treeLevelToCheck;

        // use depth-first traversal to find the parent
        const parentResult = this.getParentOfTopicNode(topicInfo, childTreeToCheck);
        if (parentResult) return parentResult;
      }
    }
  }

  /**
   * @description set topic's info about it's parent, including it's type, parentId, index
   * @param topicInfo 
   */
  setTopicInfoAboutParent(topicInfo: extendTopicInfo) {
    const parent = this.getParentOfTopicNode(topicInfo);

    // set type
    let topicType;
    if (!parent) topicType = TopicType.ROOT;
    else if (!this.getParentOfTopicNode(parent)) topicType = TopicType.MAIN;
    else topicType = TopicType.SUB;
    topicInfo.type = topicType;

    // set parentId
    topicInfo.parentId = parent ? parent.id : null;

    // set index
    topicInfo.index = parent ? parent.children.findIndex(childTopic => childTopic.id === topicInfo.id) : 0;
  }

  /**
   * @description calc and set topic's size info
   * */
  setTopicSizeInfo(topicInfo: extendTopicInfo) {
    const { style: { fontSize, strokeWidth, shapeClass }, type } = topicInfo;

    // set title area size
    const titleAreaSize = getTextSize(topicInfo.title || 'Topic', fontSize);
    topicInfo.titleAreaSize = titleAreaSize;

    let boxSize = { width: 0, height: 0 };
    const fontSizeNumber = parseInt(fontSize);
    const strokeWidthNumber = strokeWidth === TopicStrokeWidthType.NONE ? 0 : parseInt(strokeWidth);
    const { paddingLeft, paddingTop } = Distance.TopicPaddingOverride[type][shapeClass];
    boxSize.width = titleAreaSize.width + fontSizeNumber * paddingLeft * 2 + strokeWidthNumber;
    boxSize.height = titleAreaSize.height + fontSizeNumber * paddingTop * 2 + strokeWidthNumber;

    // fixme: if has info item
    if (topicInfo.label) this.extendBoxSizeWithInfoItem(topicInfo, boxSize);
    topicInfo.boxSize = boxSize;
  }

  /**
   * @description if current topic has info item, extend it's boxSize
   * */
  extendBoxSizeWithInfoItem(topicInfo: extendTopicInfo, boxSize: { width: number, height: number }) {
    const infoItemSettings = this.props.app.infoItemDisplay;

    interface labelBoxSize { width: number, height: number, mode: string }

    let labelBoxSize: labelBoxSize;

    if (infoItemSettings.label === InfoItemMode.CARD) {
      const { width: labelTextWidth, height: labelTextHeight } = getTextSize(topicInfo.label, LabelStyle.fontSize);

      const labelPadding = LabelStyle.padding;
      const labelWidth = labelTextWidth + labelPadding * 2;
      const labelHeight = labelTextHeight + labelPadding * 2;

      labelBoxSize = { width: labelWidth, height: labelHeight, mode: infoItemSettings.label };
    } else {
      labelBoxSize = { width: 20, height: 20, mode: infoItemSettings.label };
      boxSize.width += labelBoxSize.width;
    }

    topicInfo.labelBoxSize = labelBoxSize;
  }

  /**
   * @description render nested topic tree component
   * */
  renderTopicTree() {
    const { topicTree, mapStructure } = this.props.map;

    const extendedTopicInfo = this.calcExtendedTopicTreeInfo(topicTree);

    // get bounds and position
    layoutTopics(extendedTopicInfo, mapStructure);

    const topicsList = [];

    const createTopic = topicInfo => {
      const topicProps = {
        key: topicInfo.id,
        topicInfo: topicInfo
      };

      return <Topic {...topicProps} />;
    };

    const setTopicArrayData = (topicInfo) => {
      topicsList.push(createTopic(topicInfo));
      topicInfo.children && topicInfo.children.forEach(childTree => setTopicArrayData(childTree));
    };

    setTopicArrayData(extendedTopicInfo);

    return topicsList;
  }

  render() {
    return (
      <Draggable handle={`.${TopicType.ROOT}`} onMouseDown={e => e.stopPropagation()}>
        <g><g className="topics-group" transform={`scale(${this.props.scaleValue})`}>{ this.renderTopicTree() }</g></g>
      </Draggable>
    );
  }
}

const mapStateToProps = ({ map, app }) => {
  return { map, app }
};

export default connect(mapStateToProps)(Map);