import * as React from 'react';
import { connect } from 'dva'
import Topic from './Topic';
const Draggable = require('react-draggable');
import * as CommonConstant from 'src/constants/Common';
import { deepClone, getTextSize } from 'src/apptools/commonfunc';
import layoutTopics from 'src/layout';
import DefaultStyle from 'src/constants/DefaultStyle';
import * as Distance from 'src/constants/Distance';

import { mapState, appState, topicInfo, extendTopicInfo } from 'src/interface'

interface MapProps {
  map: mapState
  app: appState
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
    topicInfoCopy.style = Object.assign({}, DefaultStyle[topicInfoCopy.type], topicInfoCopy.style);

    this.setTopicSizeInfo(topicInfoCopy);

    topicInfo.children && (topicInfoCopy.children = topicInfo.children.map(childTopic => this.calcExtendedTopicTreeInfo(childTopic)));

    return topicInfoCopy;
  }

  /**
   * @param topicInfo the topic to find parent
   * @param treeLevelToCheck the check level of current check traversal, the start level is the ROOT level
   * @return the parent topic info of a topic node
   * */
  getParentOfTopicNode(topicInfo: topicInfo, treeLevelToCheck: topicInfo = this.props.map.topicTree): topicInfo {
    // if the topicInfo to check is the current check level, it means this topic is the ROOT topic
    if (topicInfo === treeLevelToCheck) return;

    // start traversing
    const children = treeLevelToCheck.children;
    if (children) {
      for (const childTreeToCheck of children) {
        if (topicInfo === childTreeToCheck) return childTreeToCheck;

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
    if (!parent) topicType = CommonConstant.TOPIC_ROOT;
    else if (!this.getParentOfTopicNode(parent)) topicType = CommonConstant.TOPIC_MAIN;
    else topicType = CommonConstant.TOPIC_SUB;
    topicInfo.type = topicType;

    // set parentId
    topicInfo.parentId = parent ? parent.id : null;

    // set index
    topicInfo.index = parent ? parent.children.indexOf(topicInfo) : 0;
  }

  setTopicSizeInfo(topicInfo: extendTopicInfo) {
    const { style: { fontSize, strokeWidth, shapeClass }, type } = topicInfo;

    // set title area size
    const titleAreaSize = getTextSize(topicInfo.title || 'Topic', fontSize);
    topicInfo.titleAreaSize = titleAreaSize;

    let boxSize = { width: 0, height: 0 };
    const fontSizeNumber = parseInt(fontSize);
    const strokeWidthNumber = strokeWidth === CommonConstant.STROKE_WIDTH_NONE ? 0 : parseInt(strokeWidth);
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

    if (infoItemSettings.label === CommonConstant.INFO_ITEM_CARD_MODE) {
      const { width: labelTextWidth, height: labelTextHeight } = getTextSize(topicInfo.label, DefaultStyle.label.fontSize);

      const labelPadding = Distance.LabelPadding;
      const labelWidth = labelPadding.paddingLeft + labelTextWidth + labelPadding.paddingRight;
      const labelHeight = labelPadding.paddingTop + labelTextHeight + labelPadding.paddingBottom;

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
    const extendedTopicInfo = this.calcExtendedTopicTreeInfo(this.props.map.topicTree);

    // get bounds and position
    layoutTopics(extendedTopicInfo);

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
      <Draggable handle={`.${CommonConstant.TOPIC_ROOT}`} onMouseDown={e => e.stopPropagation()}>
        <g><g className="topics-group">{ this.renderTopicTree() }</g></g>
      </Draggable>
    );
  }
}

const mapStateToProps = ({ map, app }) => {
  return { map, app }
};

export default connect(mapStateToProps)(Map);