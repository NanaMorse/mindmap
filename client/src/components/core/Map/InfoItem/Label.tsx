import * as React from 'react';
import { InfoItemMode } from 'src/constants/common';
import { LabelStyle } from 'src/constants/defaultstyle';
import * as CommonFunc from 'src/apptools/commonfunc';

import { extendTopicInfo } from 'src/interface';

interface LabelProps {
  topicInfo: extendTopicInfo
  displayMode: 'card' | 'icon'
  x?: number
}

const Label = ({topicInfo, displayMode, x}: LabelProps) => {
  let {boxSize: {width: parentWidth, height: parentHeight}, labelBoxSize: {width: labelWidth, height: labelHeight} , label: labelText} = topicInfo;

  if (displayMode === InfoItemMode.CARD) {

    const halfParentWidth = parentWidth / 2;
    const halfParentHeight = parentHeight / 2;

    if (labelWidth > parentWidth) labelWidth = parentWidth;

    let path = `M ${-halfParentWidth} ${halfParentHeight + 1} h ${labelWidth} v ${labelHeight} h ${-labelWidth} v ${-labelHeight} z`;

    const {fontSize, fillColor, padding} = LabelStyle;

    const labelTextStartX = -halfParentWidth + padding;
    const labelTextStartY = halfParentHeight + 1 + labelHeight / 2;

    labelText = CommonFunc.wrapTextWithEllipsis(labelText, fontSize, labelWidth - padding * 2);

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
        <image {...imageProps} />
      </g>
    );
  }
};

export default Label;