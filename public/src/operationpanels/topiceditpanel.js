import React, {Component} from 'react';

import {events, selectionsManager} from '../managers';

import * as widgetGenerator from './widgetgenerator';

import * as EventTags from '../constants/EventTags';

const UpdateFontSizeSelector = widgetGenerator.selectorGenerator('font size', 'onUpdateFontSize', {
  '10px': '10',
  '13px': '13',
  '18px': '18'
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
      onBlur: e => this.dispatchOperator(e),
      onKeyDown: e => {
        const which = e.which;
        which === 13 && this.dispatchOperator(e);
      }
    };
    
    return (
      <div { ...panelProps } >
        <UpdateFontSizeSelector initValue={this.state.fontSize} onChange={this.onUpdateFontSize.bind(this)}/>
        <UpdateFillColorPicker initValue={this.state.fillColor} onChange={this.onUpdateFillColor.bind(this)}/>
        <hr/>
        <AddChildTopicButton onClick={e => this.dispatchOperator(e)}/>
        <RemoveTopicButton onClick={e => this.dispatchOperator(e, selectionsManager.getSelectionsArrayWithoutChild())}/>
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