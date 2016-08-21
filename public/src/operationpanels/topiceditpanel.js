import React, {Component} from 'react';

import {events, selectionsManager} from '../managers';

import {selectorGenerator, colorPickerGenerator} from './widgetgenerator';

import * as EventTags from '../constants/EventTags';

const widgetIdToOperatorMap = {
  'updateFontSize': 'onUpdateFontSize',
  'updateFillColor': 'onUpdateFillColor'
};

const UpdateFontSizeSelector = selectorGenerator('font size', 'updateFontSize', {
  '10px': '10',
  '13px': '13',
  '18px': '18'
});

const UpdateFillColorPicker = colorPickerGenerator('fill color', 'updateFillColor');

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
        <UpdateFontSizeSelector initValue={this.state.fontSize} onChange={ this.onUpdateFontSize.bind(this) }/>
        <UpdateFillColorPicker initValue={this.state.fillColor} onChange={ this.onUpdateFillColor.bind(this) }/>
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

  componentDidMount() {
    events.on(EventTags.TOPICSELECTED, (topicStyle) => {
      this.setState({
        show: true,
        fontSize: topicStyle.fontSize,
        fillColor: topicStyle.fillColor
      });
    });
    
    events.on(EventTags.TOPICDESELECTED, () => {
      this.setState({
        show: false
      });
    });
  }
}

export default TopicEditPanel;