import React, {Component} from 'react';

import {events, selectionsManager} from '../managers';

import * as widgetGenerator from './widgetgenerator';

import * as EventTags from '../constants/EventTags';
import * as CommonConstant from '../constants/Common';


const UpdateFontSizeSelector = widgetGenerator.selectorGenerator('font size', 'onUpdateFontSize', {
  '10px': '10',
  '13px': '13',
  '18px': '18'
});

const UpdateShapeClassSelector = widgetGenerator.selectorGenerator('shape class', 'onUpdateShapeClass', {
  [CommonConstant.SHAPE_RECT]: 'Rect',
  [CommonConstant.SHAPE_ROUNDED_RECT]: 'Rounded Rectangle',
  [CommonConstant.SHAPE_PARALLELOGRAM]: 'Parallelogram'
});

const UpdateLineClassSelector = widgetGenerator.selectorGenerator('line class', 'onUpdateLineClass', {
  [CommonConstant.LINE_NONE]: 'None',
  [CommonConstant.LINE_RIGHT_ANGLE]: 'Right Angle',
  [CommonConstant.LINE_ROUNDED]: 'Rounded'
});

const UpdateFillColorPicker = widgetGenerator.colorPickerGenerator('fill color', 'onUpdateFillColor');

const AddChildTopicButton = widgetGenerator.buttonGenerator('add child topic', 'onAddChildTopic');

const RemoveTopicButton = widgetGenerator.buttonGenerator('remove topic', 'onRemoveSelfTopic');

const UpdateLabelTextInput = widgetGenerator.textInputGenerator('label text', 'onUpdateLabel');

class TopicEditPanel extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      remBtnDisabled: false,
      fontSize: '',
      fillColor: '',
      shapeClass: '',
      lineClass: '',
      labelText: ''
    }
  }

  render() {

    const panelProps = {
      className: 'topic-edit-panel',
      style: {
        display: this.state.show ? 'block' : 'none'
      }
    };
    
    const updateFontSizeProps = {
      value: this.state.fontSize,
      onChange: e => this.onUpdateFontSize(e)
    };
    const updateShapeClassProps = {
      value: this.state.shapeClass,
      onChange: e => this.onUpdateShapeClass(e)
    };
    const updateLineClassProps = {
      value: this.state.lineClass,
      onChange: e => this.onUpdateLineClass(e)
    };
    const updateFillColorProps = {
      value: this.state.fillColor,
      onChange: e => this.onUpdateFillColor(e)
    };

    const updateLabelProps = {
      value: this.state.labelText,
      onChange: e => this.setState({labelText: e.target.value}),
      onBlur: e => this.dispatchOperator(e),
      onKeyDown: e => {
        const which = e.which;
        which === 13 && this.dispatchOperator(e);
      }
    };
    
    const removeTopicProps = {
      onClick: e => this.dispatchOperator(e, selectionsManager.getSelectionsArrayWithoutChild()),
      disabled: this.state.remBtnDisabled
    };
    
    return (
      <div { ...panelProps } >
        <UpdateFontSizeSelector {...updateFontSizeProps}/>
        <UpdateShapeClassSelector {...updateShapeClassProps}/>
        <UpdateLineClassSelector {...updateLineClassProps}/>
        <UpdateFillColorPicker {...updateFillColorProps}/>
        <hr/>
        <AddChildTopicButton onClick={e => this.dispatchOperator(e)}/>
        <RemoveTopicButton {...removeTopicProps}/>
        <hr/>
        <UpdateLabelTextInput {...updateLabelProps}/>
      </div>
    );
  }
  
  onUpdateFontSize(e) {
    this.dispatchOperator(e);
    this.setState({
      fontSize: e.target.value
    });
  }
  
  onUpdateShapeClass(e) {
    this.dispatchOperator(e);
    this.setState({
      shapeClass: e.target.value
    });
  }

  onUpdateLineClass(e) {
    this.dispatchOperator(e);
    this.setState({
      lineClass: e.target.value
    });
  }
  
  onUpdateFillColor(e) {
    this.dispatchOperator(e);
    this.setState({
      fillColor: e.target.value
    });
  }
  
  dispatchOperator(e, operatorTargetArray = selectionsManager.getSelectionsArray()) {
    const widgetId = e.target.id;
    const widgetValue = e.target.value;

    operatorTargetArray.forEach((component) => {
      component[widgetId](widgetValue);
    });
  }

  setPanelWidgetValue(topicInfo) {
    let remBtnDisabled; {
      const selections = selectionsManager.getSelectionsArray();
      if (selections.length === 1 && selections[0].props.topicInfo.type === CommonConstant.TOPIC_ROOT) {
        remBtnDisabled = true;
      }
    }

    const topicStyle = topicInfo.style;

    this.setState({
      fontSize: topicStyle.fontSize,
      fillColor: topicStyle.fillColor,
      labelText: topicInfo.label || '',
      shapeClass: topicStyle.shapeClass,
      lineClass: topicStyle.lineClass,
      remBtnDisabled
    });
  }

  componentDidMount() {
    events.on(EventTags.TOPIC_SELECTED, (topicInfo) => {
      this.setState({show: true});
      this.setPanelWidgetValue(topicInfo);
    });
    
    events.on(EventTags.TOPIC_DESELECTED, () => {
      this.setState({show: false});
    });
    
    events.on(EventTags.UNDO_OR_REDO_TRIGGERED, () => {
      if (!this.state.show) return;

      const selections = selectionsManager.getSelectionsArray();
      this.setPanelWidgetValue(selections[selections.length - 1].props.topicInfo);
    });
  }
}

export default TopicEditPanel;