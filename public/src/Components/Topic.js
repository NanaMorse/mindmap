import React, { Component } from 'react';

import { eventEmitter } from '../managers';
import { getTextSize, editReceiver } from '../apptools';

import CalcTopicShape from '../calcpath/topicshape';

import { CPT_SELECTED } from '../constants/EventTypes';
import * as KeyCode from '../constants/KeyCode';

// Topic Shape
const TopicShape = ({ d }) => {
  return <path className = "topic-shape" d = { d } fill = "none" stroke="#000"></path>;
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
    
    return  (
      <g ref = 'text'>
        <text>{ text }</text>
      </g>
    );
  }
}

class Topic extends Component {

  constructor () {
    super();
    
    this.state = {
      selected : false
    };
    
  }
  
  render () {

    const props = this.props;
    
    const state = this.state;

    const boxSize = {};
    
    const textSize = getTextSize(props.text, props.fontSize);
    
    const paddingH = 30, paddingV = 20;
    
    boxSize.width = textSize.width + paddingH * 2;
    boxSize.height = textSize.height + paddingV * 2;
    
    const { topicShapePath, topicSelectBoxPath } = this.getTopicShapePath(boxSize);
    
    
    const gProps = {
      className : 'topic-group',
      transform : this.getTranslatePosition(),
      onClick : (e) => this.onTopicClick(e),
      onDoubleClick : (e) => this.onTopicDoubleClick(e)
    };
    
    const TopicFillProps = {
      d : topicShapePath,
      fillColor : props.fillColor
    };
    
    const TopicSelectBoxProps = {
      d : topicSelectBoxPath,
      display : state.selected
    };
    
    const TopicTextProps = {
      ref : 'TopicText',
      text : props.text,
      fontSize : props.fontSize,
      textSize : textSize,
      onUpdateTopicText : this.onUpdateTopicText
    };
    
    
    return (
      <g {...gProps} >
        <TopicShape d = { topicShapePath } />
        <TopicFill { ...TopicFillProps } />
        <TopicSelectBox { ...TopicSelectBoxProps } />
        <TopicText { ...TopicTextProps }/>
      </g>
    );
  }
  
  getTopicShapePath (boxSize) {
    return CalcTopicShape[this.props.shapeClass](boxSize);
  }

  // todo
  getTranslatePosition () {
    return 'translate(300 300)'
  }
  
  getTextClientRect () {
    return this.refs.TopicText.refs.text.getBoundingClientRect();
  }
  
  // userAgent events
  onTopicClick (e) {
    e.stopPropagation();
    
    if (this.state.selected === false) {
      this.onSelected();
      
      eventEmitter.emit(CPT_SELECTED, this);
    }
    
  }
  
  onTopicDoubleClick () {
    editReceiver.start(this);
  }

  // lifecycle events
  onSelected () {
    this.setState({ selected : true });
  }
  
  onDeselected () {
    this.setState({ selected : false });
  }

  onUpdateTopicText (text) {
    this.props.onUpdateTopicText(text);
  }
}

export default Topic;