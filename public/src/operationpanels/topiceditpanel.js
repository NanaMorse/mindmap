import React, {Component} from 'react';

import {events, selectionsManager} from '../managers';

import * as widgetGenerator from './widgetgenerator';

import * as EventTags from '../constants/EventTags';

const widgetIdToOperatorMap = {
  'updateFontSize': 'onUpdateFontSize',
  'updateFillColor': 'onUpdateFillColor',
  'addChildTopic': 'onAddChildTopic',
  'updateLabel': 'onUpdateLabel'
};

const UpdateFontSizeSelector = widgetGenerator.selectorGenerator('font size', 'updateFontSize', {
  '10px': '10',
  '13px': '13',
  '18px': '18'
});

const UpdateFillColorPicker = widgetGenerator.colorPickerGenerator('fill color', 'updateFillColor');

const AddChildTopicButton = widgetGenerator.buttonGenerator('add child topic', 'addChildTopic');

const UpdateLabelTextInput = widgetGenerator.textInputGenerator('update label', 'updateLabel');

class TopicEditPanel extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      fontSize: '10',
      fillColor: '#fef4ec',
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

    const updateLabelProps = {
      value: this.state.labelText,
      onChange: e => this.setState({labelText: e.target.value}),
      onBlur: e => this.onWidgetBlur(e)
    };
    
    return (
      <div { ...panelProps } >
        <UpdateFontSizeSelector initValue={this.state.fontSize} onChange={this.onUpdateFontSize.bind(this)}/>
        <UpdateFillColorPicker initValue={this.state.fillColor} onChange={this.onUpdateFillColor.bind(this)}/>
        <hr/>
        <AddChildTopicButton onClick={this.onWidgetClick.bind(this)}/>
        <hr/>
        <UpdateLabelTextInput {...updateLabelProps}/>
      </div>
    );
  }
  
  onUpdateFontSize(e) {
    this.onWidgetValueChange(e);
    this.setState({
      fontSize: e.target.value
    });
  }
  
  onUpdateFillColor(e) {
    this.onWidgetValueChange(e);
    this.setState({
      fillColor: e.target.value
    });
  }

  onWidgetValueChange(e) {
    const widgetId = e.target.id;
    const widgetValue = e.target.value;

    selectionsManager.getSelectionsArray().forEach((component) => {
      component[widgetIdToOperatorMap[widgetId]](widgetValue);
    });
  }

  onWidgetClick(e) {
    const widgetId = e.target.id;
    
    selectionsManager.getSelectionsArray().forEach((component) => {
      component[widgetIdToOperatorMap[widgetId]]();
    });
  }
  
  onWidgetBlur(e) {
    const widgetId = e.target.id;
    const widgetValue = e.target.value;

    selectionsManager.getSelectionsArray().forEach((component) => {
      component[widgetIdToOperatorMap[widgetId]](widgetValue);
    });
  }

  setPanelWidgetValue(topic) {
    const topicStyle = topic.style;
    const topicInfo = topic.props.topicInfo;

    this.setState({
      fontSize: topicStyle.fontSize,
      fillColor: topicStyle.fillColor,
      labelText: topicInfo.label || ''
    });
  }

  componentDidMount() {
    events.on(EventTags.TOPIC_SELECTED, (topic) => {
      this.setState({show: true});
      this.setPanelWidgetValue(topic);
    });
    
    events.on(EventTags.TOPIC_DESELECTED, () => {
      this.setState({show: false});
    });
    
    events.on(EventTags.UNDO_OR_REDO_TRIGGERED, () => {
      if (!this.state.show) return;

      const selections = selectionsManager.getSelectionsArray();
      this.setPanelWidgetValue(selections[selections.length - 1]);
    });
  }
}

export default TopicEditPanel;