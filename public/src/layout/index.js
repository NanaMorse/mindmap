import logicToRight from './logic/logictoright';
import * as Distance from '../constants/Distance';
import * as CommonConstant from '../constants/Common';


// 保存一个map，map应该记录每个id对应的组件应该所在的位置，供最后setPosition使用

// 开始计算所有组件的位置，根据tree，从顶部至尾部遍历，每个组件的structureClass决定它的直接子后代的排列方式

// 目前只考虑logictoright排列模式

/**
 * 每个组件应该由它的直接子后代的bounds信息算出它本身的bounds，若该组件没有直接子后代，则它本身的bounds等于boxSize + 各个边的内补
 **/

export default (feedTree) => {
  feedTree.position = [300, 300];

  calcComponentsBounds(feedTree);
  
  calcChildrenPosition(feedTree);

  function calcComponentsBounds(parentTree) {
    const boxSize = parentTree.boxSize;
    
    const bounds = {
      width : boxSize.width,
      height : boxSize.height
    };
    
    const childrenBounds = { width : 0, height : 0 };

    const {marginLeft, marginTop} = Distance.TopicMargin[CommonConstant.LOGICTORIGHT];

    if (parentTree.children && parentTree.children.length) {
      parentTree.children.forEach((childTree) => {
        const childBounds = calcComponentsBounds(childTree);
        if (childBounds.width > childrenBounds.width) childrenBounds.width = childBounds.width;
        childrenBounds.height += childBounds.height + marginTop;
      });
      
      childrenBounds.width += marginLeft;
      childrenBounds.height -= marginTop;
    }
    
    bounds.width += childrenBounds.width;
    if (childrenBounds.height > bounds.height) bounds.height = childrenBounds.height;

    parentTree.bounds = bounds;
    parentTree.childrenBounds = childrenBounds;
    parentTree.boxSize = boxSize;
    
    return bounds;
  }

  function calcChildrenPosition(parentTree) {
    const parentId = parentTree.id;

    // todo 根据structure决定摆放位置的方式

    const children = parentTree.children;
    
    logicToRight(parentTree);

    children && children.forEach((childTree) => {
      calcChildrenPosition(childTree);
    });
  }
}