import React, {Component} from 'react';
import Draggable from 'react-draggable';

import {events, selectionsManager} from '../managers';
import * as AppTools from '../apptools';

import * as CommonConstant from '../constants/Common';
import * as Distance from '../constants/Distance';
import * as EventTags from '../constants/EventTags';
import DefaultStyle from '../constants/DefaultStyle';

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

    const {title, fontSize, fontColor, isFontBold, isFontItalic, isFontLineThrough} = this.props;

    const style = {
      fontSize: fontSize,
      fill: fontColor
    };
    
    if (isFontBold) style.fontWeight = 700;
    if (isFontItalic) style.fontStyle = 'italic';
    if (isFontLineThrough) style.textDecoration = 'line-through';
    
    return <text ref='title' style={ style }>{ title }</text>;
  }
}

// Connect line
const ConnectLine = ({topicInfo}) => {
  const lineClass = topicInfo.style.lineClass;
  const path = CalcConnectLine[lineClass](topicInfo);

  return <path className="connect-line" d={path} stroke={DefaultStyle.connectLine.stroke} fill="none"></path>
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
  
  
  const {fontSize, fillColor} = DefaultStyle.label;
  
  labelText = AppTools.wrapTextWithEllipsis(labelText, fontSize, labelWidth - Distance.LabelPadding.paddingLeft - Distance.LabelPadding.paddingRight);

  return (
    <g className="label">
      <path className="label-shape" d={path} stroke="none" fill={fillColor}/>
      <text fontSize={fontSize} x={labelTextStartX} y={labelTextStartY}>{labelText}</text>
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
    
    const {topicInfo} = this.props;
    
    const TopicGroupProps = {
      className: `topic-group ${topicInfo.type}`,
      onDoubleClick: (e) => this.onTopicDoubleClick(e),
      transform: `translate(${topicInfo.position[0]},${topicInfo.position[1]})`
    };

    const {topicShapePath, topicSelectBoxPath} = this.getTopicShapePath();
    const style = topicInfo.style;
    
    const TopicFillProps = {
      d: topicShapePath,
      fillColor: style.fillColor
    };

    const title = topicInfo.title == null ? 'Topic' : topicInfo.title;
    const TopicTitleProps = {
      ref: 'TopicTitle',
      title: title,
      fontSize: style.fontSize,
      fontColor: style.fontColor,
      isFontBold: style.isFontBold,
      isFontItalic: style.isFontItalic,
      isFontLineThrough: style.isFontLineThrough
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

    const needConnectLine = style.lineClass !== CommonConstant.LINE_NONE && topicInfo.children && topicInfo.children.length;
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
        {needConnectLine ? <ConnectLine topicInfo={topicInfo}/> : []}
      </g>
    );
  }

  getTopicShapePath() {
    const topicInfo = this.props.topicInfo;
    return CalcTopicShape[topicInfo.style.shapeClass](topicInfo.boxSize);
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
    AppTools.editReceiver.show();
  }
  
  onTopicMouseEnter() {
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
    AppTools.editReceiver.prepare(this);
    
    events.emit(EventTags.TOPIC_SELECTED, this.props.topicInfo);
  }

  onDeselected() {
    this.setState({selected: false});
    
    events.emit(EventTags.TOPIC_DESELECTED);
  }

  onUpdateTitle(title) {
    if (title === this.props.topicInfo.title) {
      return false;
    }

    this.props.onUpdateTitle(this.props.id, title);
  }

  // method for editReceiver
  getTitleClientRect() {
    return this.refs.TopicTitle.refs.title.getBoundingClientRect();
  }

  getTitle() {
    return this.props.topicInfo.title || 'Topic';
  }

  getType() {
    return this.props.topicInfo.type;
  }

  // method for reducer
  onUpdateFontSize(fontSize) {
    this.props.onUpdateFontSize(this.props.id, fontSize);
  }

  onUpdateFontColor(fontColor) {
    this.props.onUpdateFontColor(this.props.id, fontColor);
  }

  onUpdateIsFontBold(isFontBold) {
    this.props.onUpdateIsFontBold(this.props.id, isFontBold);
  }

  onUpdateIsFontItalic(isFontItalic) {
    this.props.onUpdateIsFontItalic(this.props.id, isFontItalic);
  }

  onUpdateIsFontLineThrough(isFontLineThrough) {
    this.props.onUpdateIsFontLineThrough(this.props.id, isFontLineThrough);
  }

  onUpdateFillColor(fillColor) {
    this.props.onUpdateFillColor(this.props.id, fillColor);
  }

  onUpdateLabel(labelText) {
    if (labelText === this.props.topicInfo.label) return;
    this.props.onUpdateLabel(this.props.id, labelText);
  }

  onUpdateShapeClass(shapeClass) {
    this.props.onUpdateShapeClass(this.props.id, shapeClass);
  }

  onUpdateLineClass(lineClass) {
    this.props.onUpdateLineClass(this.props.id, lineClass);
  }

  onAddTopicBefore() {
    this.props.onAddChildTopic(this.props.parentId, {id: AppTools.generateUUID()}, this.props.index);
  }

  onAddChildTopic() {
    this.props.onAddChildTopic(this.props.id, {id: AppTools.generateUUID()});
  }

  onAddParentTopic() {
    this.props.onAddParentTopic(this.props.id, AppTools.generateUUID());
  }

  onRemoveSelfTopic() {
    this.props.onRemoveSelfTopic(this.props.id);
    selectionsManager.removeSelection(this);
    events.emit(EventTags.TOPIC_DESELECTED);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stringify = JSON.stringify.bind(JSON);

    // check state
    const stateHasChanged = stringify(this.state) !== stringify(nextState);
    if (stateHasChanged) return true;

    // check self props
    const topicInfo = this.props.topicInfo;
    const nextTopicInfo = nextProps.topicInfo;

    const styleHasChanged = stringify(topicInfo.style) !== stringify(nextTopicInfo.style);
    const boundsHasChanged = stringify(topicInfo.bounds) !== stringify(nextTopicInfo.bounds);
    const positionHasChanged = stringify(topicInfo.position) !== stringify(nextTopicInfo.position);
    const titleHasChanged = topicInfo.title !== nextTopicInfo.title;

    const selfPropsHasChanged = styleHasChanged || boundsHasChanged || positionHasChanged || titleHasChanged;
    if (selfPropsHasChanged) return true;

    
    // check child structure props
    const children = topicInfo.children;
    const nextChildren = nextTopicInfo.children;
    
    let childShapeClassHasChanged = false;
    if (children && nextChildren) {
      childShapeClassHasChanged = children.some((childInfo, index) => {
        return childInfo.style.shapeClass !== nextChildren[index].style.shapeClass;
      });
    }
    
    return childShapeClassHasChanged;
  }

  componentWillUnmount() {
    selectionsManager.removeSelection(this);
  }
}

class Topics extends Component {

  render() {
    // calculate layout position first
    const topicsExtend = this.calculateTopicsExtendInfo();
    
    const {
      onUpdateTitle, 
      onUpdateFontSize, 
      onUpdateFillColor, 
      onAddChildTopic,
      onAddParentTopic,
      onRemoveSelfTopic,
      onUpdateLabel,
      onUpdateShapeClass,
      onUpdateLineClass,
      onUpdateFontColor,
      onUpdateIsFontBold,
      onUpdateIsFontItalic,
      onUpdateIsFontLineThrough
    } = this.props;

    const topicsArray = [];

    const createTopic = topicInfo => {

      const id = topicInfo.id;

      const topicProps = {
        key: id,
        id: id,
        parentId: topicInfo.parentId,
        index: topicInfo.index,
        topicInfo: topicInfo,
        onUpdateTitle,
        onUpdateFontSize,
        onUpdateFillColor,
        onAddChildTopic,
        onAddParentTopic,
        onRemoveSelfTopic,
        onUpdateLabel,
        onUpdateShapeClass,
        onUpdateLineClass,
        onUpdateFontColor,
        onUpdateIsFontBold,
        onUpdateIsFontItalic,
        onUpdateIsFontLineThrough
      };

      return <Topic { ...topicProps } ></Topic>;
    };

    const setTopicArrayData = (topicInfo) => {
      topicsArray.push(createTopic(topicInfo));
      topicInfo.children && topicInfo.children.forEach(childTree => setTopicArrayData(childTree));
    };

    setTopicArrayData(topicsExtend);
    
    return (
      <Draggable handle={`.${CommonConstant.TOPIC_ROOT}`}>
        <g><g className="topics-group">{ topicsArray }</g></g>
      </Draggable>
    );
  }
  
  // calculate topics info, include boxSize and topic type
  calculateTopicsExtendInfo () {
    const topicsCopy = AppTools.deepClone(this.props);
    
    _calculate();

    // get bounds and position
    layoutTopics(topicsCopy);

    return topicsCopy;
    
    function _calculate(topicTree = topicsCopy) {
      // get Topic type
      let topicType;

      const parent = findTopicParent(topicTree);

      if (parent == null) topicType = CommonConstant.TOPIC_ROOT;

      else if (findTopicParent(parent) == null) topicType = CommonConstant.TOPIC_MAIN;

      else topicType = CommonConstant.TOPIC_SUB;

      topicTree.type = topicType;
      
      topicTree.parentId = parent ? parent.id : null;
      
      topicTree.index = parent ? parent.children.indexOf(topicTree) : 0;
      
      // mix topic style
      topicTree.style = Object.assign({}, DefaultStyle[topicType], topicTree.style || {});

      // get boxSize
      const fontSize = Object.assign({}, DefaultStyle[topicType], topicTree.style).fontSize;

      const titleAreaSize = AppTools.getTextSize(topicTree.title || 'Topic', fontSize);

      const boxSize = {};
      const {paddingLeft, paddingTop} = Distance.TopicPaddingOverride[topicType][topicTree.style.shapeClass];
      const fontSizeNumber = parseInt(fontSize);
      boxSize.width = titleAreaSize.width + fontSizeNumber * paddingLeft * 2;
      boxSize.height = titleAreaSize.height + fontSizeNumber * paddingTop * 2;

      // if has label
      if (topicTree.label) {
        const {width: labelTextWidth, height: labelTextHeight} = AppTools.getTextSize(topicTree.label, DefaultStyle.label.fontSize);

        const labelPadding = Distance.LabelPadding;
        const labelWidth = labelPadding.paddingLeft + labelTextWidth + labelPadding.paddingRight;
        const labelHeight = labelPadding.paddingTop + labelTextHeight + labelPadding.paddingBottom;
        
        topicTree.labelBoxSize = {width: labelWidth, height: labelHeight};
      }
      
      topicTree.boxSize = boxSize;

      topicTree.children && topicTree.children.forEach(childTree => _calculate(childTree));
      
    }

    function findTopicParent (topicTree, treeToCheck = topicsCopy)  {
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