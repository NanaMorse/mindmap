import * as React from 'react';

// Topic Fill
interface TopicFillProps {
  d: string;
  fillColor: string
}

const TopicFill = ({d, fillColor}: TopicFillProps) => {
  return <path className="topic-fill" d={ d } fill={ fillColor } stroke="none" />;
};

export default TopicFill;