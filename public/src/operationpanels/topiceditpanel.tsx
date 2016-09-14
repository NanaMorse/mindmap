import * as React from 'react';

import {events, selectionsManager} from '../managers';

import * as WidgetGenerator from './widgetgenerator';

import * as EventTags from '../constants/EventTags';
import * as CommonConstant from '../constants/Common';


const AddChildTopicButton = WidgetGenerator.buttonGenerator('Add Child Topic', 'onAddChildTopic');

const AddTopicBeforeButton = WidgetGenerator.buttonGenerator('Add Topic Before', 'onAddTopicBefore');

const AddParentTopicButton = WidgetGenerator.buttonGenerator('Add Parent Topic', 'onAddParentTopic');

const RemoveTopicButton = WidgetGenerator.buttonGenerator('Remove Topic', 'onRemoveSelfTopic');

const UpdateFontSizeSelector = WidgetGenerator.selectorGenerator('Font Size', 'onUpdateFontSize', {
  '8px': '8', '9px': '9', '10px': '10', '11px': '11', '12px': '12', '13px': '13', '14px': '14', '16px': '16',
  '18px': '18', '20px': '20', '22px': '22', '24px': '24', '36px': '36', '48px': '48', '56px': '56'
});

const UpdateFontColorPicker = WidgetGenerator.colorPickerGenerator('Font Color', 'onUpdateFontColor');

const UpdateIsFontBoldCheckBox = WidgetGenerator.checkBoxGenerator('Bold', 'onUpdateIsFontBold');

const UpdateIsFontItalicCheckBox = WidgetGenerator.checkBoxGenerator('Italic', 'onUpdateIsFontItalic');

const UpdateIsFontLineThroughCheckBox = WidgetGenerator.checkBoxGenerator('Line Through', 'onUpdateIsFontLineThrough');

const UpdateShapeClassSelector = WidgetGenerator.selectorGenerator('Shape Class', 'onUpdateShapeClass', {
  [CommonConstant.SHAPE_RECT]: 'Rect',
  [CommonConstant.SHAPE_ROUNDED_RECT]: 'Rounded Rectangle',
  [CommonConstant.SHAPE_PARALLELOGRAM]: 'Parallelogram'
});

const UpdateStrokeWidthSelector = WidgetGenerator.selectorGenerator('Border Width', 'onUpdateStrokeWidth', {
  [CommonConstant.STROKE_WIDTH_NONE]: 'None',
  [CommonConstant.STROKE_WIDTH_THIN]: 'Thin',
  [CommonConstant.STROKE_WIDTH_MIDDLE]: 'Middle',
  [CommonConstant.STROKE_WIDTH_FAT]: 'Fat'
});

const UpdateStrokeColorPicker = WidgetGenerator.colorPickerGenerator('Border Color', 'onUpdateStrokeColor');

const UpdateLineClassSelector = WidgetGenerator.selectorGenerator('Line Class', 'onUpdateLineClass', {
  [CommonConstant.LINE_NONE]: 'None',
  [CommonConstant.LINE_RIGHT_ANGLE]: 'Right Angle',
  [CommonConstant.LINE_ROUNDED]: 'Rounded'
});

const UpdateLineWidthSelector = WidgetGenerator.selectorGenerator('Line Width', 'onUpdateLineWidth', {
  [CommonConstant.LINE_WIDTH_NONE]: 'None',
  [CommonConstant.LINE_WIDTH_THIN]: 'Thin',
  [CommonConstant.LINE_WIDTH_MIDDLE]: 'Middle',
  [CommonConstant.LINE_WIDTH_FAT]: 'Fat'
});

const UpdateLineColorPicker = WidgetGenerator.colorPickerGenerator('Line Color', 'onUpdateLineColor');

const UpdateFillColorPicker = WidgetGenerator.colorPickerGenerator('Fill Color', 'onUpdateFillColor');

const UpdateLabelTextInput = WidgetGenerator.textInputGenerator('Label Text', 'onUpdateLabel');

interface TopicEditPanelState {
  show?: boolean;
  isTargetRoot?: boolean;

  fontSize?: string;
  fontColor?: string;
  isFontBold?: boolean;
  isFontItalic?: boolean;
  isFontLineThrough?: boolean;
  
  shapeClass?: string;
  fillColor?: string;
  strokeWidth?: string;
  strokeColor?: string;
  
  lineClass?: string;
  lineWidth?: string;
  lineColor?: string;
  
  labelText?: string;
}

class TopicEditPanel extends React.Component<void, TopicEditPanelState> {
  constructor() {
    super();

    this.state = {
      show: false,
      isTargetRoot: false,

      fontSize: '',
      fontColor: '',
      isFontBold: false,
      isFontItalic: false,
      isFontLineThrough: false,
      
      shapeClass: '',
      fillColor: '',
      strokeWidth: '',
      strokeColor: '',
      
      lineClass: '',
      lineWidth: '',
      lineColor: '',
      
      labelText: ''
    }
  }

  render() {

    const panelProps = {
      className: 'edit-panel topic-edit-panel',
      style: {
        display: this.state.show ? 'block' : 'none'
      }
    };

    const actionSingleTopicExceptRootProps = {
      onClick: e => this.dispatchOperator(e, null, [selectionsManager.getSelectionsArray()[0]]),
      disabled: this.state.isTargetRoot
    };

    const removeTopicProps = {
      onClick: e => this.dispatchOperator(e, null, selectionsManager.getSelectionsArrayWithoutChild()),
      disabled: this.state.isTargetRoot
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
        <AddChildTopicButton onClick={e => this.dispatchOperator(e)}/>
        <AddTopicBeforeButton {...actionSingleTopicExceptRootProps}/>
        <AddParentTopicButton {...actionSingleTopicExceptRootProps}/>
        <RemoveTopicButton {...removeTopicProps}/>
        <hr/>
        <UpdateFontSizeSelector {...this.generateNormalProps('fontSize')}/>
        <UpdateFontColorPicker {...this.generateColorPickerProps('fontColor')}/>
        <UpdateIsFontBoldCheckBox {...this.generateCheckBoxProps('isFontBold')}/>
        <UpdateIsFontItalicCheckBox {...this.generateCheckBoxProps('isFontItalic')}/>
        <UpdateIsFontLineThroughCheckBox {...this.generateCheckBoxProps('isFontLineThrough')}/>
        <hr/>
        <UpdateShapeClassSelector {...this.generateNormalProps('shapeClass')}/>
        <UpdateFillColorPicker {...this.generateColorPickerProps('fillColor')}/>
        <UpdateStrokeWidthSelector {...this.generateNormalProps('strokeWidth')}/>
        <UpdateStrokeColorPicker {...this.generateColorPickerProps('strokeColor')}/>
        <hr/>
        <UpdateLineClassSelector {...this.generateNormalProps('lineClass')}/>
        <UpdateLineWidthSelector {...this.generateNormalProps('lineWidth')}/>
        <UpdateLineColorPicker {...this.generateColorPickerProps('lineColor')}/>
        <hr/>
        <UpdateLabelTextInput {...updateLabelProps}/>
      </div>
    );
  }

  generateColorPickerProps(stateKey) {
    return {
      value: this.state[stateKey],
      onChange: (id, color) => {
        selectionsManager.getSelectionsArray().forEach((component) => {
          component[id](color);
        });
        this.setState({
          [stateKey]: color
        });
      }
    }
  }

  generateNormalProps(stateKey) {
    return {
      value: this.state[stateKey],
      onChange: e => this.dispatchOperator(e, stateKey)
    };
  }

  generateCheckBoxProps(stateKey) {
    return {
      checked: this.state[stateKey],
      onClick: e => {
        const widgetId = e.target.id;
        const checked = e.target.checked;

        selectionsManager.getSelectionsArray().forEach((component) => {
          component[widgetId](checked);
        });

        this.setState({
          [stateKey]: checked
        });
      }
    }
  }

  dispatchOperator(e, syncValue?, operatorTargetArray = selectionsManager.getSelectionsArray()) {
    const widgetId = e.target.id;
    const widgetValue = e.target.value;

    operatorTargetArray.forEach((component) => {
      component[widgetId](widgetValue);
    });

    if (syncValue) {
      this.setState({
        [syncValue]: widgetValue
      });
    }
  }

  setPanelWidgetValue(topicInfo) {
    let isTargetRoot; {
      const selections = selectionsManager.getSelectionsArray();
      if (selections.length === 1 && selections[0].props.topicInfo.type === CommonConstant.TOPIC_ROOT) {
        isTargetRoot = true;
      }
    }

    const topicStyle = topicInfo.style;

    this.setState({
      fontSize: topicStyle.fontSize,
      fontColor: topicStyle.fontColor,
      isFontBold: !!topicStyle.isFontBold,
      isFontItalic: !!topicStyle.isFontItalic,
      isFontLineThrough: !!topicStyle.isFontLineThrough,
      
      shapeClass: topicStyle.shapeClass,
      fillColor: topicStyle.fillColor,
      strokeWidth: topicStyle.strokeWidth,
      strokeColor: topicStyle.strokeColor,

      lineClass: topicStyle.lineClass,
      lineWidth: topicStyle.lineWidth,
      lineColor: topicStyle.lineColor,
  
      labelText: topicInfo.label || '',
      isTargetRoot
    });
  }

  componentDidMount() {
    events.on(EventTags.TOPIC_SELECTED, (topicInfo) => {
      if (!topicInfo) {
        const selections = selectionsManager.getSelectionsArray();
        topicInfo = selections[selections.length - 1].props.topicInfo;
      }

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