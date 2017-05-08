/**
 * @fileOverview 布局入口函数 / layout entry function
 * */
import logicToRight from './logic/logictoright';
import * as Distance from '../constants/distance';
import { LayoutType } from '../constants/common';
import { extendTopicInfo } from 'src/interface'

/**
 * @description structure name to layout function
 * */
const layoutFunctionMap = {
  [LayoutType.LOGIC_TO_RIGHT]: logicToRight
};

/**
 * @description the root topic's default position
 * */
const rootPosition: [number, number] = [300, 300];

/**
 * @description calculate and assign the position of every single topic
 * @param topicTree
 * @param mapStructure
 * @return {extendTopicInfo}
 * */
export default (topicTree: extendTopicInfo, mapStructure: string) => {
  // set root topic's position
  topicTree.position = rootPosition;

  calcComponentsBounds(topicTree, mapStructure);

  calcComponentPosition(topicTree, mapStructure);
}

/**
 * @description 计算每一个组件的bounds数据 / calculate component's bounds info
 * */
function calcComponentsBounds(topicTree: extendTopicInfo, mapStructure: string) {
  const boxSize = topicTree.boxSize;

  const bounds = {
    width : boxSize.width,
    height : boxSize.height
  };

  const childrenBounds = { width : 0, height : 0 };

  const {marginLeft, marginTop} = Distance.TopicMargin[mapStructure];

  if (topicTree.children && topicTree.children.length) {
    topicTree.children.forEach((childTree) => {
      const childBounds = calcComponentsBounds(childTree, mapStructure);
      if (childBounds.width > childrenBounds.width) childrenBounds.width = childBounds.width;
      childrenBounds.height += childBounds.height + marginTop;
    });

    childrenBounds.width += marginLeft;
    childrenBounds.height -= marginTop;
  }

  bounds.width += childrenBounds.width;
  if (childrenBounds.height > bounds.height) bounds.height = childrenBounds.height;

  topicTree.bounds = bounds;
  topicTree.childrenBounds = childrenBounds;
  topicTree.boxSize = boxSize;

  return bounds;
}

/**
 * @description 计算每一个组件的位置
 * */
function calcComponentPosition(topicInfo: extendTopicInfo, mapStructure: string) {
  const children = topicInfo.children;

  layoutFunctionMap[mapStructure](topicInfo);

  children && children.forEach((childTree) => {
    calcComponentPosition(childTree, mapStructure);
  });
}