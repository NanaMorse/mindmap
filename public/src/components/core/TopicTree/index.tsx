import * as React from 'react';
import Topic from './Topic';
const Draggable = require('react-draggable');

import * as CommonConstant from '../../../constants/Common';
import * as CommonFunc from '../../../apptools/commonfunc';
import layoutTopics from '../../../layout';
import DefaultStyle from '../../../constants/DefaultStyle';
import * as Distance from '../../../constants/Distance';

class Topics extends React.Component<any, void> {

  render() {
    // calculate layout position first
    const topicsExtend = this.calculateTopicsExtendInfo();

    const topicsArray = [];

    const createTopic = topicInfo => {

      const id = topicInfo.id;

      const topicProps = {
        key: id,
        id: id,
        parentId: topicInfo.parentId,
        index: topicInfo.index,
        topicInfo: topicInfo,
        infoItem: this.props.infoItem
      };

      return <Topic {...this.props.dispatchMethod} {...topicProps} />;
    };

    const setTopicArrayData = (topicInfo) => {
      topicsArray.push(createTopic(topicInfo));
      topicInfo.children && topicInfo.children.forEach(childTree => setTopicArrayData(childTree));
    };

    setTopicArrayData(topicsExtend);

    return (
      <Draggable handle={`.${CommonConstant.TOPIC_ROOT}`} onMouseDown={e => e.stopPropagation()}>
        <g><g className="topics-group">{ topicsArray }</g></g>
      </Draggable>
    );
  }

  // calculate topics info, include boxSize and topic type
  calculateTopicsExtendInfo () {
    const infoItemSettings = this.props.infoItem;

    const topicsCopy = CommonFunc.deepClone(this.props);

    _calculate(topicsCopy);

    // get bounds and position
    layoutTopics(topicsCopy);

    return topicsCopy;

    function _calculate(topicTree) {
      const copyAsOrigin = CommonFunc.deepClone(topicTree);

      // get Topic type
      let topicType;

      const parent = findTopicParent(topicTree);

      if (parent == null) topicType = CommonConstant.TOPIC_ROOT;

      else if (findTopicParent(parent) == null) topicType = CommonConstant.TOPIC_MAIN;

      else topicType = CommonConstant.TOPIC_SUB;

      topicTree.type = topicType;

      topicTree.originTopicInfo = copyAsOrigin;

      topicTree.parentId = parent ? parent.id : null;

      topicTree.index = parent ? parent.children.indexOf(topicTree) : 0;

      // mix topic style
      topicTree.style = (Object as any).assign({}, DefaultStyle[topicType], topicTree.style || {});

      // get boxSize
      const fontSize = topicTree.style.fontSize;

      const titleAreaSize = CommonFunc.getTextSize(topicTree.title || 'Topic', fontSize);
      topicTree.titleAreaSize = titleAreaSize;

      const boxSize = {width: 0, height: 0};
      const {paddingLeft, paddingTop} = Distance.TopicPaddingOverride[topicType][topicTree.style.shapeClass];
      const fontSizeNumber = parseInt(fontSize);
      const strokeWidthNumber = topicTree.style.strokeWidth === CommonConstant.STROKE_WIDTH_NONE ? 0 : parseInt(topicTree.style.strokeWidth);
      boxSize.width = titleAreaSize.width + fontSizeNumber * paddingLeft * 2 + strokeWidthNumber;
      boxSize.height = titleAreaSize.height + fontSizeNumber * paddingTop * 2 + strokeWidthNumber;

      // if has label
      if (topicTree.label) {

        interface labelBoxSize { width: number, height: number, mode: string }

        let labelBoxSize: labelBoxSize;

        if (infoItemSettings.label === CommonConstant.INFO_ITEM_CARD_MODE) {
          const {width: labelTextWidth, height: labelTextHeight} = CommonFunc.getTextSize(topicTree.label, DefaultStyle.label.fontSize);

          const labelPadding = Distance.LabelPadding;
          const labelWidth = labelPadding.paddingLeft + labelTextWidth + labelPadding.paddingRight;
          const labelHeight = labelPadding.paddingTop + labelTextHeight + labelPadding.paddingBottom;

          labelBoxSize = {width: labelWidth, height: labelHeight, mode: infoItemSettings.label};
        } else {
          labelBoxSize = {width: 20, height: 20, mode: infoItemSettings.label};
          boxSize.width += labelBoxSize.width;
        }

        topicTree.labelBoxSize = labelBoxSize;
      }

      topicTree.boxSize = boxSize;

      topicTree.children && topicTree.children.forEach(childTree => _calculate(childTree));

    }

    function findTopicParent (topicTree, treeToCheck = topicsCopy)  {
      if (topicTree === treeToCheck) return;

      const children = treeToCheck.children;
      if (children) {
        for (const childTreeToCheck of children) {
          if (topicTree === childTreeToCheck) return treeToCheck;

          const parentResult = findTopicParent(topicTree, childTreeToCheck);
          if (parentResult) return parentResult;
        }
      }
    }
  }
}

export default Topics;