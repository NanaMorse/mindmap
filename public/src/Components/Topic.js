import React, { Component } from 'react';

import { eventEmitter } from '../managers';

import CalcTopicShape from '../calcpath/topicshape';

import { CPT_SELECTED } from '../constants/EventTypes';

// Topic Shape
const TopicShape = ({ d }) => {
  return <path d = { d } fill = "none" stroke="#000"></path>;
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
const TopicText = ({ text, fontSize }) => {
  const style = { fontSize };

  return  <text textAnchor = "middle"  dominantBaseline = "central"   style = { style }>{ text }</text>;
};

const textSizeDiv = (() => {
  const div = document.createElement('div');
  const body = document.querySelector('body');

  div.style.position = 'fixed';
  div.style.visibility = 'hidden';
  
  body.appendChild(div);
  
  return div;
})();

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
    
    const textSize = this.getTextSize();
    
    const paddingH = 30, paddingV = 20;
    
    boxSize.width = textSize.width + paddingH * 2;
    boxSize.height = textSize.height + paddingV * 2;
    
    const { topicShapePath, topicSelectBoxPath } = this.getTopicShapePath(boxSize);
    
    return (
      <g transform = { this.getTranslatePosition() } onClick = { this.onClick.bind(this) }>
        <TopicShape d = { topicShapePath } />
        <TopicFill d = { topicShapePath } fillColor = { props.fillColor } />
        <TopicSelectBox display = { state.selected } d = { topicSelectBoxPath } />
        <TopicText text = { props.text  } fontSize = { props.fontSize } />
      </g>
    );
  }

  getTextSize () {
    
    textSizeDiv.style.fontSize = this.props.fontSize;
    textSizeDiv.innerText = this.props.text;
    
    return {
      width : textSizeDiv.clientWidth,
      height : textSizeDiv.clientHeight
    };
    
  }

  getTopicShapePath (boxSize) {
    return CalcTopicShape[this.props.shapeClass](boxSize);
  }

  // todo
  getTranslatePosition () {
    return 'translate(300 300)'
  }
  
  // events
  onClick (e) {
    e.stopPropagation();
    
    if (this.state.selected === false) {
      this.setState({
        selected : true
      });
      
      eventEmitter.emit(CPT_SELECTED, this);
    }
    
    this.props.onClick();
  }
  
}

export default Topic;