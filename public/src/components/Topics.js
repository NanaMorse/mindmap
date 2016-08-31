import React, {Component} from 'react';

import {events, selectionsManager} from '../managers';
import {getTextSize, editReceiver, deepAssign, generateUUID, wrapTextWithEllipsis} from '../apptools';

import * as CommonConstant from '../constants/Common';
import * as Distance from '../constants/Distance';
import * as EventTags from '../constants/EventTags';

import CalcTopicShape from '../calcpath/topicshape';
import CalcConnectLine from '../calcpath/connectline';

import layoutTopics from '../layout';

// Topic Shape
const TopicShape = ({d}) => {
  return <path className="topic-shape" d={ d } stroke="#000"></path>;
};

// Topic Fill
const TopicFill = ({d, fillColor}) => {
  return <path className="topic-fill" d={ d } fill={ fillColor } stroke="none"></path>;
};

// Topic Select Box
const TopicSelectBox = ({d, selected, hovered}) => {
  const style = {
    display: selected || hovered ? 'block' : 'none'
  };

  const hoveredStroke = 'rgb(199, 217, 231)';
  const selectedStroke = 'rgb(75, 111, 189)';
  
  return <path d={ d } fill="none" stroke={selected ? selectedStroke : hoveredStroke} strokeWidth="3" style={ style }></path>;
};

// Topic Title
class TopicTitle extends Component {
  render() {

    const {title} = this.props;

    const style = {
      fontSize: this.props.fontSize
    };

    return <text ref='title' style={ style }>{ title }</text>;
  }
}

// Connect line
const ConnectLine = ({topicInfo, lineClass}) => {
  const path = CalcConnectLine[lineClass](topicInfo);

  return <path className="connect-line" d={path} stroke="#000" fill="none"></path>
};

// Label
const Label = ({topicInfo}) => {
  let {boxSize: {width: parentWidth, height: parentHeight}, labelBoxSize, label: labelText} = topicInfo;
  
  const halfParentWidth = parentWidth / 2;
  const halfParentHeight = parentHeight / 2;

  let {width: labelWidth, height: labelHeight} = labelBoxSize;
  if (labelWidth > parentWidth) labelWidth = parentWidth;

  let path = `M ${-halfParentWidth} ${halfParentHeight + 1} h ${labelWidth} v ${labelHeight} h ${-labelWidth} v ${-labelHeight} z`;

  const labelTextStartX = -halfParentWidth + Distance.LabelPadding.paddingLeft;
  const labelTextStartY = halfParentHeight + 1 + labelHeight / 2;

  labelText = wrapTextWithEllipsis(labelText, CommonConstant.LABEL_TEXT_SIZE, labelWidth);

  return (
    <g className="label">
      <path className="label-shape" d={path} stroke="none" fill={CommonConstant.LABEL_FILL_COLOR}/>
      <text style={{fontSize: CommonConstant.LABEL_TEXT_SIZE}} x={labelTextStartX} y={labelTextStartY}>{labelText}</text>
    </g>
  )
};

class Topic extends Component {

  constructor() {
    super();

    this.state = {
      selected: false,
      hovered: false
    };

  }

  render() {
    
    const {topicInfo, defaultStyle} = this.props;

    const style = this.style = Object.assign({}, defaultStyle[topicInfo.type], topicInfo.style || {});

    topicInfo.title = topicInfo.title == null ? 'Topic' : topicInfo.title;
    
    const boxSize = topicInfo.boxSize;
    
    const {topicShapePath, topicSelectBoxPath} = this.getTopicShapePath(boxSize, style.shapeClass);

    const TopicGroupProps = {
      className: 'topic-group',
      onDoubleClick: (e) => this.onTopicDoubleClick(e),
      transform: `translate(${topicInfo.position[0]},${topicInfo.position[1]})`
    };

    const TopicFillProps = {
      d: topicShapePath,
      fillColor: style.fillColor
    };

    const TopicTitleProps = {
      ref: 'TopicTitle',
      title: topicInfo.title,
      fontSize: style.fontSize
    };
    
    const TopicBoxGroupProps = {
      className: 'topic-box-group',
      onClick: (e) => this.onTopicClick(e),
      onMouseEnter: (e) => this.onTopicMouseEnter(e),
      onMouseOut: (e) => this.onTopicMouseOut(e)
    };

    const TopicSelectBoxProps = {
      d: topicSelectBoxPath,
      selected: this.state.selected,
      hovered: this.state.hovered
    };

    const needConnectLine = topicInfo.children && topicInfo.children.length;
    const needLabel = topicInfo.label;
    
    return (
      <g {...TopicGroupProps} >
        {needLabel ? <Label topicInfo={topicInfo}/> : []}
        <g {...TopicBoxGroupProps}>
          <TopicShape d={topicShapePath}/>
          <TopicFill {...TopicFillProps}/>
          <TopicTitle {...TopicTitleProps}/>
        </g>
        <TopicSelectBox {...TopicSelectBoxProps}/>
        {needConnectLine ? <ConnectLine topicInfo={topicInfo} lineClass={style.lineClass}/> : []}
      </g>
    );
  }

  getTopicShapePath(boxSize, shapeClass) {
    return CalcTopicShape[shapeClass](boxSize);
  }
  
  // userAgent events
  onTopicClick(e) {
    e.stopPropagation();

    if (this.state.selected === false) {
      (e.ctrlKey || e.metaKey) ? selectionsManager.addSelection(this)
        : selectionsManager.selectSingle(this);
      this.onSelected();
    }

  }

  onTopicDoubleClick() {
    editReceiver.show();
  }
  
  onTopicMouseEnter(e) {
    // if not selected, show hovered box
    if (!this.state.selected) {
      this.setState({hovered: true});
    }
  }

  onTopicMouseOut(e) {
    if (e.target.classList.value.includes('topic-fill') && this.state.hovered) {
      this.setState({hovered: false});
    }
  }

  // lifecycle events
  onSelected() {
    this.setState({selected: true, hovered: false});
    editReceiver.prepare(this);
    
    events.emit(EventTags.TOPIC_SELECTED, this);
  }

  onDeselected() {
    this.setState({selected: false});
    
    events.emit(EventTags.TOPIC_DESELECTED);
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

  getType() {
    return this.props.topicInfo.type;
  }

  // method for reducer
  onUpdateFontSize(fontSize) {
    this.props.onUpdateFontSize(this.props.topicInfo.id, fontSize);
  }

  onUpdateFillColor(fillColor) {
    this.props.onUpdateFillColor(this.props.topicInfo.id, fillColor);
  }

  onUpdateLabel(labelText) {
    if (labelText === this.props.topicInfo.label) return;
    this.props.onUpdateLabel(this.props.topicInfo.id, labelText);
  }

  onUpdateShapeClass(shapeClass) {
    this.props.onUpdateShapeClass(this.props.topicInfo.id, shapeClass);
  }

  onUpdateLineClass(lineClass) {
    this.props.onUpdateLineClass(this.props.topicInfo.id, lineClass);
  }

  onAddChildTopic() {
    this.props.onAddChildTopic(this.props.topicInfo.id, generateUUID());
  }

  onRemoveSelfTopic() {
    this.props.onRemoveSelfTopic(this.props.topicInfo.id);
    selectionsManager.removeSelection(this);
    events.emit(EventTags.TOPIC_DESELECTED);
  }

  componentWillUnmount() {
    selectionsManager.removeSelection(this);
  }
}

class Topics extends Component {

  render() {
    // calculate layout position first
    const feedExtend = this.calculateFeedExtendInfo();
    
    const {
      onUpdateTitle, 
      onUpdateFontSize, 
      onUpdateFillColor, 
      onAddChildTopic, 
      onRemoveSelfTopic,
      onUpdateLabel,
      onUpdateShapeClass,
      onUpdateLineClass
    } = this.props;

    const topicsArray = [];

    const createTopic = feedInfo => {

      const id = feedInfo.id;

      const topicProps = {
        key: id,
        id: id,
        topicInfo: feedInfo,
        defaultStyle: this.props.defaultStyle,
        onUpdateTitle,
        onUpdateFontSize,
        onUpdateFillColor,
        onAddChildTopic,
        onRemoveSelfTopic,
        onUpdateLabel,
        onUpdateShapeClass,
        onUpdateLineClass
      };

      return <Topic { ...topicProps } ></Topic>;
    };

    const setTopicArrayData = (feedTree) => {
      topicsArray.push(createTopic(feedTree));
      feedTree.children && feedTree.children.forEach(childTree => setTopicArrayData(childTree));
    };

    setTopicArrayData(feedExtend);
    
    return <g className="topics-group">{ topicsArray }</g>;
  }
  
  // calculate feed info, include boxSize and topic type
  calculateFeedExtendInfo () {
    const {defaultStyle, feed} = this.props;

    const feedCopy = deepAssign({}, feed);
    
    _calculate();

    // get bounds and position
    layoutTopics(feedCopy);

    return feedCopy;
    
    function _calculate(feedTree = feedCopy) {
      // get Topic type
      let topicType;

      const parent = findTopicParent(feedTree);

      if (parent == null) topicType = CommonConstant.ROOT_TOPIC;

      else if (findTopicParent(parent) == null) topicType = CommonConstant.MAIN_TOPIC;

      else topicType = CommonConstant.SUB_TOPIC;

      feedTree.type = topicType;

      // get boxSize
      const fontSize = Object.assign({}, defaultStyle[topicType], feedTree.style).fontSize;

      const titleAreaSize = getTextSize(feedTree.title || 'Topic', fontSize);

      const boxSize = {};
      const {paddingLeft, paddingRight, paddingTop, paddingBottom} = Distance.TopicPadding[topicType];
      boxSize.width = titleAreaSize.width + paddingLeft + paddingRight;
      boxSize.height = titleAreaSize.height + paddingTop + paddingBottom;

      // if has label
      if (feedTree.label) {
        const {width: labelTextWidth, height: labelTextHeight} = getTextSize(feedTree.label, CommonConstant.LABEL_TEXT_SIZE);

        const labelPadding = Distance.LabelPadding;
        const labelWidth = labelPadding.paddingLeft + labelTextWidth + labelPadding.paddingRight;
        const labelHeight = labelPadding.paddingTop + labelTextHeight + labelPadding.paddingBottom;
        
        feedTree.labelBoxSize = {width: labelWidth, height: labelHeight};
      }
      
      feedTree.boxSize = boxSize;

      feedTree.children && feedTree.children.forEach(childTree => _calculate(childTree));
      
    }

    function findTopicParent (topicTree, treeToCheck = feedCopy)  {
      if (topicTree === treeToCheck) return;

      const children = treeToCheck.children;
      if (children) {
        for (const childTreeToCheck of children) {
          if (topicTree === childTreeToCheck) return treeToCheck;

          const parentResult = findTopicParent(topicTree, childTreeToCheck);
          if (parentResult) return parentResult;
        }
      }
    }
  }
}


export default Topics;