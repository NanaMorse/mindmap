import React, { Component } from 'react';

import { selectionsManager, mindTree } from '../managers';
import { getTextSize, editReceiver } from '../apptools';

import CalcTopicShape from '../calcpath/topicshape';

import layoutTopics from '../layout';

// Topic Shape
const TopicShape = ({ d }) => {
  return <path className = "topic-shape" d = { d } stroke="#000"></path>;
};

// Topic Fill
const TopicFill = ({ d, fillColor }) => {
  return <path d = { d } fill = { fillColor } stroke = "none"></path>;
};

// Topic Select Box
const TopicSelectBox = ({ d, display }) => {
  const style = { 
    display : display ? 'block' : 'none'
  };

  return <path d = { d } fill = "none" stroke="#000" style = { style }></path>;
};

// Topic Text
class TopicText extends Component {
  render () {
    
    const { text } = this.props;
    
    const style = {
      fontSize : this.props.fontSize
    };
    
    return  (
      <g ref = 'text'>
        <text style = { style } >{ text }</text>
      </g>
    );
  }
}

let topicBoxSizeChanged = false;

class Topic extends Component {

  constructor () {
    super();
    
    this.state = {
      selected : false
    };
    
  }
  
  render () {
    
    const state = this.state;

    const { topicInfo, defaultStyle } = this.props;
    
    const style = Object.assign({}, defaultStyle, topicInfo.style || {});
    
    const boxSize = this.boxSize = {};
    
    const textAreaSize = getTextSize(topicInfo.text, style.fontSize);
    
    const paddingH = 30, paddingV = 20;
    
    boxSize.width = textAreaSize.width + paddingH * 2;
    boxSize.height = textAreaSize.height + paddingV * 2;
    
    const { topicShapePath, topicSelectBoxPath } = this.getTopicShapePath(boxSize, style.shapeClass);

    // 检测是否有topic的size发生了改变
    const { preBoxSize = {} } = this;
    if (preBoxSize.width !== boxSize.width || preBoxSize.height !== boxSize.height) {
      this.preBoxSize = boxSize;
      topicBoxSizeChanged = true;
    }
    
    const gProps = {
      ref : 'TopicGroup',
      className : 'topic-group',
      onClick : (e) => this.onTopicClick(e),
      onDoubleClick : (e) => this.onTopicDoubleClick(e)
    };
    
    const TopicFillProps = {
      d : topicShapePath,
      fillColor : style.fillColor
    };
    
    const TopicSelectBoxProps = {
      d : topicSelectBoxPath,
      display : state.selected
    };
    
    const TopicTextProps = {
      ref : 'TopicText',
      text : topicInfo.text,
      fontSize : style.fontSize
    };

    mindTree.addNode(topicInfo.parentId, topicInfo.id, this);


    return (
      <g {...gProps} >
        <TopicShape d = { topicShapePath } />
        <TopicFill { ...TopicFillProps } />
        <TopicSelectBox { ...TopicSelectBoxProps } />
        <TopicText { ...TopicTextProps }/>
      </g>
    );
  }
  
  getTopicShapePath (boxSize, shapeClass) {
    return CalcTopicShape[shapeClass](boxSize);
  }

  setPosition (position) {
    if (Array.isArray(position)) position = `translate(${position[0]},${position[1]})`;

    if (this.prePosition === position) return;

    this.prePosition = position;
    this.refs.TopicGroup.setAttribute('transform', position);
  }
  
  // userAgent events
  onTopicClick (e) {
    e.stopPropagation();
    
    if (this.state.selected === false) {
      this.onSelected();
      e.ctrlKey ? selectionsManager.addSelection(this)
        : selectionsManager.selectSingle(this);
    }
    
  }
  
  onTopicDoubleClick () {
    editReceiver.show();
  }

  // lifecycle events
  onSelected () {
    this.setState({ selected : true });

    editReceiver.prepare(this);
  }
  
  onDeselected () {
    this.setState({ selected : false });
  }

  onUpdateText (text) {
    if (text === this.props.topicInfo.text) {
      return false;
    }
    
    this.props.onUpdateText(this.props.topicInfo.id, text);
  }
  
  // method for editReceiver
  getTextClientRect () {
    return this.refs.TopicText.refs.text.getBoundingClientRect();
  }
  
  getText () {
    return this.props.topicInfo.text;
  }
  
  // method for reducer
  onUpdateFontSize (fontSize) {
    this.props.onUpdateFontSize(this.props.topicInfo.id, fontSize);
  }

  onUpdateFillColor (fillColor) {
    this.props.onUpdateFillColor(this.props.topicInfo.id, fillColor);
  }
}

class Topics extends Component {

  render () {
    const { defaultStyle, feed, topicById } = this.props;

    const { onUpdateText, onUpdateFontSize, onUpdateFillColor } = this.props;

    const createTopic = id => {

      const topicProps = {
        key : id,
        topicInfo : topicById[id],
        defaultStyle,
        onUpdateText,
        onUpdateFontSize,
        onUpdateFillColor
      };

      return <Topic { ...topicProps } ></Topic>;
    };

    return <g className = "topics-group" >{ feed.map(createTopic) }</g>;
  }

  componentDidMount () {

    console.log('Topics did mount!');

    layoutTopics();

    topicBoxSizeChanged = false;
  }

  componentDidUpdate () {
    console.log('Topics did update!');

    if (topicBoxSizeChanged) {
      layoutTopics();
      topicBoxSizeChanged = false;
    }
  }
}


export default Topics;