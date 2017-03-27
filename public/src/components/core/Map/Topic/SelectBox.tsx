import * as React from 'react';

// Topic Select Box
interface TopicSelectBoxProps {
  d: string;
  selected: boolean;
  hovered: boolean;
}

const TopicSelectBox = ({d, selected, hovered}: TopicSelectBoxProps) => {
  const style = {
    visibility: selected || hovered ? 'visible' : 'hidden'
  };

  const hoveredStroke = 'rgb(199, 217, 231)';
  const selectedStroke = 'rgb(75, 111, 189)';

  return <path d={ d } className="topic-select-box" fill="none" stroke={selected ? selectedStroke : hoveredStroke} strokeWidth="3" style={ style } />;
};

export default TopicSelectBox;