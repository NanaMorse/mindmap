import React, { Component } from 'react';

import { eventEmitter } from '../managers';

import CalcTopicShape from '../calcpath/topicshape';

import { CPT_SELECTED } from '../constants/EventTypes';

// Tool method
const getTextSize = (() => {
  const div = document.createElement('div');
  const body = document.querySelector('body');

  div.style.position = 'fixed';
  div.style.visibility = 'hidden';

  body.appendChild(div);

  return (text, fontSize) => {
    div.style.fontSize = fontSize;
    div.innerText = text;

    return {
      width : div.clientWidth,
      height : div.clientHeight
    };
  }
})();

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
class TopicText extends React.Component {

  constructor () {
    super();

    this.state = {
      editing : false
    };

  }
  
  render () {
    const { text, fontSize, textSize } = this.props;
    
    const inputSize = Object.assign({}, textSize, {
      height : textSize.height + 5
    });
    
    const { x, y } = this.getSelfPosition(inputSize);
    
    const textProps = {
      style : {
        fontSize
      }
    };
    
    const inputStyle = Object.assign({}, inputSize, {
      display : this.state.editing ? 'block' : 'none'
    });
    
    const inputProps = {
      ref : 'input',
      type : 'text',
      style : inputStyle,
      onBlur : (e) => this.finishEditing(e)
    };

    return  (
      <g>
        <text { ...textProps } >{ text }</text>
        <foreignObject x = { x } y = { y } >
          <input { ...inputProps }/>
        </foreignObject>
      </g>
    );
  }

  getSelfPosition (size) {
    return {
      x : - size.width / 2,
      y : - size.height / 2
    }
  }

  startEditing () {
    this.setState({ editing : true }, () => {
      this.refs.input.focus();
    });
  }

  finishEditing () {
    // todo
    this.setState({
      editing : false
    });
    
    this.props.onUpdateTopicText(this.refs.input.value);
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
      ref : 'topicText',
      text : props.text,
      fontSize : props.fontSize,
      textSize : textSize,
      onUpdateTopicText : props.onUpdateTopicText
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
  
  // userAgent events
  onTopicClick (e) {
    e.stopPropagation();
    
    if (this.state.selected === false) {
      this.onSelected();
      
      eventEmitter.emit(CPT_SELECTED, this);
    }
    
  }
  
  onTopicDoubleClick () {
    const topicText = this.refs.topicText;
    
    if (!topicText.state.editing) {
      topicText.startEditing();
    }
  }

  // lifecycle events
  onSelected () {
    this.setState({ selected : true });
  }
  
  onDeselected () {
    this.setState({ selected : false });
  }

/*  onUpdateTopicText () {

  }*/
  
}

export default Topic;