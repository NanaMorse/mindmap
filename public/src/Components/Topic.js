import React, { Component } from 'react';



// Topic Shape
class TopicShape extends Component {
  render () {
    const d = this.props.d;

    return <path d={d} fill="none" stroke="#000"></path>;
  }
}

// Topic Fill
class TopicFill extends Component {
  render () {
    const d = this.props.d;

    return <path d={d} fill="aquamarine" stroke="#000"></path>;
  }
}

// Topic Text
class TopicText extends Component {
  
  render () {
    const { text, fontSize} = this.props;

    const { x, y } = this.getPosition();
    
    return  <text font-size = {fontSize}  x = { x }  y = { y }>{ text }</text>;
  }

  getPosition () {
    
    const {size} = this.props;

    const x = -(size.width / 2);
    const y = size.height / 2;

    return {x, y};
    
  }
  
}

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
      text : 'Central Topic',
      fontSize : '16px'
    }
  }
  
  render () {
    const state = this.state;
    
    return (
      <g transform = { this.getTranslatePosition() }>
        <TopicText text = { state.text  } fontSize = { state.fontSize } size = { this.getTextElemSize() }/>
      </g>
    );
  }
  

  getTextElemSize () {

    textSizeDiv.style.fontSize = this.state.fontSize;
    textSizeDiv.innerText = this.state.text;
    
    return {
      width : textSizeDiv.clientWidth,
      height : textSizeDiv.clientHeight
    };
    
  }

  // todo
  getTranslatePosition () {
    return 'translate(100 100)'
  }
}

export default Topic;