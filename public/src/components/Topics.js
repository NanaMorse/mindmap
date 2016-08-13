import React, {Component} from 'react';

import {selectionsManager, mindTree} from '../managers';
import {getTextSize, editReceiver, deepAssign, generateUUID} from '../apptools';

import CalcTopicShape from '../calcpath/topicshape';

import layoutTopics from '../layout';

// Topic Shape
const TopicShape = ({d}) => {
  return <path className="topic-shape" d={ d } stroke="#000"></path>;
};

// Topic Fill
const TopicFill = ({d, fillColor}) => {
  return <path d={ d } fill={ fillColor } stroke="none"></path>;
};

// Topic Select Box
const TopicSelectBox = ({d, display}) => {
  const style = {
    display: display ? 'block' : 'none'
  };

  return <path d={ d } fill="none" stroke="#000" style={ style }></path>;
};

// Topic Title
class TopicTitle extends Component {
  render() {

    const {title} = this.props;

    const style = {
      fontSize: this.props.fontSize
    };

    return (
      <g ref='title'>
        <text style={ style }>{ title }</text>
      </g>
    );
  }
}

let topicBoxSizeChanged = false;

class Topic extends Component {

  constructor() {
    super();

    this.state = {
      selected: false
    };

  }

  render() {

    const state = this.state;

    const {topicInfo, defaultStyle} = this.props;

    const style = Object.assign({}, defaultStyle, topicInfo.style || {});

    const boxSize = this.boxSize = {};

    topicInfo.title = topicInfo.title == null ? 'Topic' : topicInfo.title;

    const titleAreaSize = getTextSize(topicInfo.title, style.fontSize);

    const paddingH = 30, paddingV = 20;

    boxSize.width = titleAreaSize.width + paddingH * 2;
    boxSize.height = titleAreaSize.height + paddingV * 2;

    const {topicShapePath, topicSelectBoxPath} = this.getTopicShapePath(boxSize, style.shapeClass);

    // 检测是否有topic的size发生了改变
    const {preBoxSize = {}} = this;
    if (preBoxSize.width !== boxSize.width || preBoxSize.height !== boxSize.height) {
      this.preBoxSize = boxSize;
      topicBoxSizeChanged = true;
    }

    const gProps = {
      ref: 'TopicGroup',
      className: 'topic-group',
      onClick: (e) => this.onTopicClick(e),
      onDoubleClick: (e) => this.onTopicDoubleClick(e)
    };

    const TopicFillProps = {
      d: topicShapePath,
      fillColor: style.fillColor
    };

    const TopicSelectBoxProps = {
      d: topicSelectBoxPath,
      display: state.selected
    };

    const TopicTitleProps = {
      ref: 'TopicTitle',
      title: topicInfo.title,
      fontSize: style.fontSize
    };

    mindTree.addNode(this.props.id, this);

    return (
      <g {...gProps} >
        <TopicShape d={ topicShapePath }/>
        <TopicFill { ...TopicFillProps } />
        <TopicSelectBox { ...TopicSelectBoxProps } />
        <TopicTitle { ...TopicTitleProps }/>
      </g>
    );
  }

  getTopicShapePath(boxSize, shapeClass) {
    return CalcTopicShape[shapeClass](boxSize);
  }

  setPosition(position) {
    if (Array.isArray(position)) position = `translate(${position[0]},${position[1]})`;

    if (this.prePosition === position) return;

    this.prePosition = position;
    this.refs.TopicGroup.setAttribute('transform', position);
  }

  // userAgent events
  onTopicClick(e) {
    e.stopPropagation();

    if (this.state.selected === false) {
      this.onSelected();
      e.ctrlKey ? selectionsManager.addSelection(this)
        : selectionsManager.selectSingle(this);
    }

  }

  onTopicDoubleClick() {
    editReceiver.show();
  }

  // lifecycle events
  onSelected() {
    this.setState({selected: true});

    editReceiver.prepare(this);
  }

  onDeselected() {
    this.setState({selected: false});
  }

  onUpdateTitle(title) {
    if (title === this.props.topicInfo.title) {
      return false;
    }

    this.props.onUpdateTitle(this.props.topicInfo.id, title);
  }

  // method for editReceiver
  getTitleClientRect() {
    return this.refs.TopicTitle.refs.title.getBoundingClientRect();
  }

  getTitle() {
    return this.props.topicInfo.title;
  }

  // method for reducer
  onUpdateFontSize(fontSize) {
    this.props.onUpdateFontSize(this.props.topicInfo.id, fontSize);
  }

  onUpdateFillColor(fillColor) {
    this.props.onUpdateFillColor(this.props.topicInfo.id, fillColor);
  }

  onAddChildTopic() {
    this.props.onAddChildTopic(this.props.topicInfo.id, generateUUID());
  }

  onRemoveSelfTopic() {
    this.props.onRemoveSelfTopic(this.props.topicInfo.id);
  }

  componentWillUnmount() {
    mindTree.removeNode(this.props.id);
  }
}

class Topics extends Component {

  render() {
    const {defaultStyle, feed} = this.props;
    
    const feedCopy = deepAssign({}, feed);

    const {
      onUpdateTitle, 
      onUpdateFontSize, 
      onUpdateFillColor, 
      onAddChildTopic, 
      onRemoveSelfTopic
    } = this.props;

    const createTopic = selfFeed => {

      const id = selfFeed.id;

      const topicProps = {
        key: id,
        id: id,
        topicInfo: selfFeed,
        defaultStyle,
        onUpdateTitle,
        onUpdateFontSize,
        onUpdateFillColor,
        onAddChildTopic,
        onRemoveSelfTopic
      };

      return <Topic { ...topicProps } ></Topic>;
    };

    mindTree.tree = feedCopy;

    const topicsArray = [];

    const setTopicArrayData = (feedTree) => {
      topicsArray.push(createTopic(feedTree));
      feedTree.children && feedTree.children.forEach(childTree => setTopicArrayData(childTree));
    };

    setTopicArrayData(feedCopy);
    
    return <g className="topics-group">{ topicsArray }</g>;
  }

  componentDidMount() {

    console.log('Topics did mount!');

    layoutTopics();

    topicBoxSizeChanged = false;
  }

  componentDidUpdate() {
    console.log('Topics did update!');

/*    if (topicBoxSizeChanged) {
      layoutTopics();
      topicBoxSizeChanged = false;
    }*/

    layoutTopics();
  }
}


export default Topics;