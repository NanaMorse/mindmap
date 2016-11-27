import * as React from 'react';

import * as CommonConstant from '../constants/Common';
import * as Distance from '../constants/Distance';
import DefaultStyle from '../constants/DefaultStyle';
import * as CommonFunc from '../apptools/commonfunc';

import { TopicInfo } from '../interface';

interface LabelProps {
  topicInfo: TopicInfo
  displayMode: 'card' | 'icon'
  x?: number
}

const Label = ({topicInfo, displayMode, x}: LabelProps) => {
  let {boxSize: {width: parentWidth, height: parentHeight}, labelBoxSize: {width: labelWidth, height: labelHeight} , label: labelText} = topicInfo;

  if (displayMode === CommonConstant.INFO_ITEM_CARD_MODE) {

    const halfParentWidth = parentWidth / 2;
    const halfParentHeight = parentHeight / 2;

    if (labelWidth > parentWidth) labelWidth = parentWidth;

    let path = `M ${-halfParentWidth} ${halfParentHeight + 1} h ${labelWidth} v ${labelHeight} h ${-labelWidth} v ${-labelHeight} z`;

    const labelTextStartX = -halfParentWidth + Distance.LabelPadding.paddingLeft;
    const labelTextStartY = halfParentHeight + 1 + labelHeight / 2;

    const {fontSize, fillColor} = DefaultStyle.label;

    labelText = CommonFunc.wrapTextWithEllipsis(labelText, fontSize, labelWidth - Distance.LabelPadding.paddingLeft - Distance.LabelPadding.paddingRight);

    return (
      <g className="label">
        <path className="label-shape" d={path} stroke="none" fill={fillColor}/>
        <text fontSize={fontSize} x={labelTextStartX} y={labelTextStartY}>{labelText}</text>
      </g>
    )
  } else {

    const imageProps = {
      xlinkHref: '../../images/label.png',
      width: 20,
      height: 20,
      x: x,
      y: -10
    };

    return (
      <g className="label">
        <image {...imageProps}></image>
      </g>
    );
  }
};

export default Label;