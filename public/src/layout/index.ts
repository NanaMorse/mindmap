import logicToRight from './logic/logictoright';
import * as Distance from '../constants/Distance';
import * as CommonConstant from '../constants/Common';

export default (topicTree) => {
  topicTree.position = [300, 300];

  calcComponentsBounds(topicTree);

  calcChildrenPosition(topicTree);

  function calcComponentsBounds(parentTree) {
    const boxSize = parentTree.boxSize;

    const bounds = {
      width : boxSize.width,
      height : boxSize.height
    };

    // if has label
    if (parentTree.labelBoxSize) {
      bounds.height += parentTree.labelBoxSize.height;
    }

    const childrenBounds = { width : 0, height : 0 };

    const {marginLeft, marginTop} = Distance.TopicMargin[CommonConstant.LOGIC_TO_RIGHT];

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

    // todo æ ¹æ®structureå†³å®šæ‘†æ”¾ä½ç½®çš„æ–¹å¼

    const children = parentTree.children;

    logicToRight(parentTree);

    children && children.forEach((childTree) => {
      calcChildrenPosition(childTree);
    });
  }
}