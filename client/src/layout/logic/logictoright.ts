import * as Distance from '../../constants/Distance';
import * as CommonConstant from '../../constants/Common';

export default function logicToRight(parentTree) {
  const { position, boxSize, children } = parentTree;

  const {marginLeft, marginTop} = Distance.TopicMargin[CommonConstant.LOGIC_TO_RIGHT];

  let topHeight = 0;

  const childrenMiddleHeight = parentTree.childrenBounds.height / 2;

  children && children.forEach((childTree) => {
    const childTreeBounds = childTree.bounds;
    const halfChildBoxWidth = childTree.boxSize.width / 2;

    const x = position[0] + boxSize.width / 2 + marginLeft + halfChildBoxWidth;

    let y = position[1] + topHeight + childTreeBounds.height / 2 - childrenMiddleHeight;

    topHeight += childTreeBounds.height + marginTop;

    // fix label height
    if (childTree.labelBoxSize && childTree.labelBoxSize.mode === 'card' && children.length !== 1) {
      y -= childTree.labelBoxSize.height / 2;
    }

    childTree.position = [x, y];

  });

}