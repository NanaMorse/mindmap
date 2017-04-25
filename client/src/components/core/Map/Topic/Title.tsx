import * as React from 'react';

// Topic Title
interface TopicTitleProps {
  title: string
  fontSize: string
  fontColor: string
  isFontBold: boolean
  isFontItalic: boolean
  isFontLineThrough: boolean
  x: number
}

class TopicTitle extends React.Component<TopicTitleProps, void> {
  render() {

    let { title, fontSize, fontColor, isFontBold, isFontItalic, isFontLineThrough, x } = this.props;

    // 设置默认title
    if (title.trim() === '') title = 'Topic';

    const style: any = {
      fontSize: fontSize,
      fill: fontColor
    };

    if (isFontBold) style.fontWeight = 700;
    if (isFontItalic) style.fontStyle = 'italic';
    if (isFontLineThrough) style.textDecoration = 'line-through';

    return <text ref='title' style={ style } x={x}>{ title }</text>;
  }
}

export default TopicTitle