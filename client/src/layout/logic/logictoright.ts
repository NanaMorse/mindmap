import * as Distance from 'src/constants/distance';
import { LayoutType } from 'src/constants/common';
import { extendTopicInfo } from 'src/interface'

const { LOGIC_TO_RIGHT } = LayoutType;

class LogicToRight {

  public startLayout(topicTree: extendTopicInfo) {
    this.calcBounds(topicTree);
    this.calcPosition(topicTree);
  }

  private calcBounds(topicTree: extendTopicInfo) {
    const boxSize = topicTree.boxSize;

    const bounds = {
      width : boxSize.width,
      height : boxSize.height
    };

    const childrenBounds = { width : 0, height : 0 };

    const {marginLeft, marginTop} = Distance.TopicMargin[LOGIC_TO_RIGHT];

    if (topicTree.children && topicTree.children.length) {
      topicTree.children.forEach((childTree) => {
        const childBounds = this.calcBounds(childTree);
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

  private calcPosition(topicTree: extendTopicInfo) {
    const { position, boxSize, children } = topicTree;

    const {marginLeft, marginTop} = Distance.TopicMargin[LayoutType.LOGIC_TO_RIGHT];

    let topHeight = 0;

    const childrenMiddleHeight = topicTree.childrenBounds.height / 2;

    children && children.forEach((childTree) => {
      const childTreeBounds = childTree.bounds;
      const halfChildBoxWidth = childTree.boxSize.width / 2;

      const x = position[0] + boxSize.width / 2 + marginLeft + halfChildBoxWidth;

      let y = position[1] + topHeight + childTreeBounds.height / 2 - childrenMiddleHeight;

      topHeight += childTreeBounds.height + marginTop;

      // // fix label height
      // if (childTree.labelBoxSize && childTree.labelBoxSize.mode === 'card' && children.length !== 1) {
      //   y -= childTree.labelBoxSize.height / 2;
      // }

      childTree.position = [x, y];

      this.calcPosition(childTree);
    });
  }
}

export default new LogicToRight()