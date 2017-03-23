import * as React from 'react';
import CalcConnectLine from 'src/calcpath/connectline';

// Connect line
const ConnectLine = ({topicInfo}) => {
  const {lineClass, lineWidth, lineColor} = topicInfo.style;
  const path = CalcConnectLine[lineClass](topicInfo);

  return <path className="connect-line" d={path} stroke={lineColor} strokeWidth={lineWidth} fill="none" />
};

export default ConnectLine;