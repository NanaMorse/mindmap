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
export default (topicTree: extendTopicInfo, mapStructure: string = LayoutType.LOGIC_TO_RIGHT) => {
  // set root topic's position
  topicTree.position = rootPosition;

  layoutFunctionMap[mapStructure].startLayout(topicTree);
}