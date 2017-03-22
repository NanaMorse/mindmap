import * as React from 'react';

// Topic Shape
interface TopicShapeProps {
  d: string;
  strokeWidth: string;
  strokeColor: string;
}

const TopicShape = ({d, strokeWidth, strokeColor}: TopicShapeProps) => {
  return <path className="topic-shape" d={ d } stroke={strokeColor} strokeWidth={strokeWidth} />;
};

export default TopicShape;