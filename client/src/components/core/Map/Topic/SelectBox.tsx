import * as React from 'react'
import { SelectBoxColor } from 'src/constants/defaultstyle'

// Topic Select Box
interface TopicSelectBoxProps {
  d: string;
  selected: boolean;
  hovered: boolean;
}

const TopicSelectBox = ({d, selected, hovered}: TopicSelectBoxProps) => {

  const selectedBoxProps = {
    className: 'topic-select-box',
    fill: 'none',
    d: d,
    stroke: selected ? SelectBoxColor.SELECTED : SelectBoxColor.HOVER,
    strokeWidth: '3',
    style: { visibility: (selected || hovered) ? 'visible' : 'hidden' }
  };

  return <path { ...selectedBoxProps }/>;
};

export default TopicSelectBox;