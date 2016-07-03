/*
import * as structureClasses from '../constants/StructureClasses';

import logicToRight from './logic/logictoright';

export default {
  [structureClasses.LOGICTORIGHT] : logicToRight
};*/

import { mindTree } from '../managers';

import logicToRight from './logic/logictoright';


export default () => {
  const componentMap = mindTree.getMap();
  
  for (const id in componentMap) {
    
    const position = logicToRight(id);
    
    componentMap[id].setPosition(position);
  }
}