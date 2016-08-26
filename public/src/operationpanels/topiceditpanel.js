import React, {Component} from 'react';

import {events, selectionsManager} from '../managers';

import * as widgetGenerator from './widgetgenerator';

import * as EventTags from '../constants/EventTags';

const widgetIdToOperatorMap = {
  'updateFontSize': 'onUpdateFontSize',
  'updateFillColor': 'onUpdateFillColor',
  'addChildTopic': 'onAddChildTopic'
};

const UpdateFontSizeSelector = widgetGenerator.selectorGenerator('font size', 'updateFontSize', {
  '10px': '10',
  '13px': '13',
  '18px': '18'
});

const UpdateFillColorPicker = widgetGenerator.colorPickerGenerator('fill color', 'updateFillColor');

const AddChildTopicButton = widgetGenerator.buttonGenerator('add child topic', 'addChildTopic');

class TopicEditPanel extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      fontSize: '10',
      fillColor: '#fef4ec'
    }
  }

  render() {

    const panelProps = {
      className: 'topic-edit-panel',
      style: {
        display: this.state.show ? 'block' : 'none'
      }
    };
    
    // todo sync value when invoke undo and redo
    return (
      <div { ...panelProps } >
        <UpdateFontSizeSelector initValue={ this.state.fontSize } onChange={ this.onUpdateFontSize.bind(this) }/>
        <UpdateFillColorPicker initValue={ this.state.fillColor } onChange={ this.onUpdateFillColor.bind(this) }/>
        <hr/>
        <AddChildTopicButton onClick={ this.onWidgetClick.bind(this) }/>
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

  setPanelWidgetValue(topicStyle) {
    this.setState({
      fontSize: topicStyle.fontSize,
      fillColor: topicStyle.fillColor
    });
  }

  componentDidMount() {
    events.on(EventTags.TOPICSELECTED, (topicStyle) => {
      this.setState({show: true});
      this.setPanelWidgetValue(topicStyle)
    });
    
    events.on(EventTags.TOPICDESELECTED, () => {
      this.setState({show: false});
    });
    
    events.on(EventTags.UNDO_OR_REDO_TRIGGERED, () => {
      if (!this.state.show) return;

      const selections = selectionsManager.getSelectionsArray();
      this.setPanelWidgetValue(selections[selections.length - 1].style);
    });
  }
}

export default TopicEditPanel;