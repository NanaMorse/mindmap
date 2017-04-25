import * as React from 'react'
import { connect } from 'dva'
import { TopicShapeType, TopicStrokeWidthType, LineType, LineStrokeWidthType } from 'src/constants/common'
import { topicExtendedInfoMap } from 'src/managers'
import { Button, Selector, ColorPicker, Switch } from '../antd'

const optionsMap = {
  fontSize: {
    '8px': '8', '9px': '9', '10px': '10', '11px': '11', '12px': '12', '13px': '13', '14px': '14', '16px': '16',
    '18px': '18', '20px': '20', '22px': '22', '24px': '24', '36px': '36', '48px': '48', '56px': '56'
  },

  shapeClass: {
    [TopicShapeType.RECT]: 'Rect',
    [TopicShapeType.ROUNDED_RECT]: 'Rounded Rectangle',
    [TopicShapeType.PARALLELOGRAM]: 'Parallelogram'
  },

  borderWidth: {
    [TopicStrokeWidthType.NONE]: 'None',
    [TopicStrokeWidthType.THIN]: 'Thin',
    [TopicStrokeWidthType.MIDDLE]: 'Middle',
    [TopicStrokeWidthType.BOLD]: 'Bold'
  },

  lineClass: {
    [LineType.NONE]: 'None',
    [LineType.RIGHT_ANGLE]: 'Right Angle',
    [LineType.ROUNDED]: 'Rounded'
  },

  lineWidth: {
    [LineStrokeWidthType.NONE]: 'None',
    [LineStrokeWidthType.THIN]: 'Thin',
    [LineStrokeWidthType.MIDDLE]: 'Middle',
    [LineStrokeWidthType.BOLD]: 'Bold'
  }
};

interface TopicEditPanelProps {
  selectionList: Array<string>
  dispatch: Function
}

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

class TopicEditPanel extends React.Component<TopicEditPanelProps, TopicEditPanelState> {
  constructor(props: TopicEditPanelProps) {
    super();

    this.setStateBySelectionList(props.selectionList);
  }

  static defaultProps = {
    selectionList: []
  };

  componentWillReceiveProps(nextProps: TopicEditPanelProps) {
    // reset state while selection list changed
    this.setStateBySelectionList(nextProps.selectionList);
  }

  /**
   * @description set state according to current selected topics
   * @param selectionList current selected topics
   * */
  setStateBySelectionList(selectionList: Array<string>) {
    if (!selectionList.length) return;

    // todo 先根据最后列表中最后的一个topic来确定样式
    const topicInfoToSetStyle = topicExtendedInfoMap[selectionList[selectionList.length - 1]];
    const styleToSet = topicInfoToSetStyle.style;

    this.state = {
      fontSize: styleToSet.fontSize,
      fontColor: styleToSet.fontColor,
      isFontBold: styleToSet.isFontBold,
      isFontItalic: styleToSet.isFontItalic,
      isFontLineThrough: styleToSet.isFontLineThrough,

      shapeClass: styleToSet.shapeClass,
      fillColor: styleToSet.fillColor,
      strokeWidth: styleToSet.strokeWidth,
      strokeColor: styleToSet.strokeColor,

      lineClass: styleToSet.lineClass,
      lineWidth: styleToSet.lineWidth,
      lineColor: styleToSet.lineColor,

      labelText: topicInfoToSetStyle.label || '',

      // todo
      isTargetRoot: false
    }
  }

  /**
   * @description the operator button for editing topic tree
   */
  renderTreeEditWidgetArea() {

    const addChildTopicBtnProps = {
      type: 'primary',
      onClick: () => this.props.dispatch({ type: 'map/addChildTopic' })
    };

    const addTopicBeforeBtnProps = {
      type: 'primary',
      onClick: () => this.props.dispatch({ type: 'map/addTopicBefore' })
    };

    const addTopicAfterBtnProps = {
      type: 'primary',
      onClick: () => this.props.dispatch({ type: 'map/addTopicAfter' })
    };

    const addParentTopicBtnProps = {
      type: 'primary',
      onClick: () => this.props.dispatch({ type: 'map/addParentTopic' })
    };

    const removeTopicBtnProps = {
      type: 'danger',
      onClick: () => this.props.dispatch({ type: 'map/removeTopic' })
    };

    return (
      <div>
        <Button {...addChildTopicBtnProps}>Add Child Topic</Button>
        <Button {...addTopicBeforeBtnProps}>Add Topic Before</Button>
        <Button {...addTopicAfterBtnProps}>Add Topic After</Button>
        <Button {...addParentTopicBtnProps}>Add Parent Topic</Button>
        <Button {...removeTopicBtnProps}>Remove Topic</Button>
      </div>
    )
  }

  /**
   * @description the operator widget for editing topic text
   */
  renderFontStyleEditWidgetArea() {

    const fontSizeSelectorProps = {
      options: optionsMap.fontSize,
      value: this.state.fontSize,
      onChange: (value) => this.props.dispatch({ type: 'map/setFontSize', fontSize: value })
    };

    const fontColorPickerProps = {
      value: this.state.fontColor,
      onChange: (value) => this.props.dispatch({ type: 'map/setFontColor', fontColor: value })
    };

    const isFontBoldSwitchProps = {
      checked: this.state.isFontBold,
      onChange: (value) => this.props.dispatch({ type: 'map/setIsFontBold', isFontBold: value })
    };

    const isFontItalicSwitchProps = {
      checked: this.state.isFontItalic,
      onChange: (value) => this.props.dispatch({ type: 'map/setIsFontItalic', isFontItalic: value })
    };

    const isFontLineThroughProps = {
      checked: this.state.isFontLineThrough,
      onChange: (value) => this.props.dispatch({ type: 'map/setIsFontLineThrough', isFontLineThrough: value })
    };

    return (
      <div>
        <div className="row-container">
          <span>Font Size : </span>
          <Selector {...fontSizeSelectorProps}/>
        </div>
        <div className="row-container">
          <span>Font Color : </span>
          <ColorPicker {...fontColorPickerProps}/>
        </div>
        <div className="row-container">
          <span>Bold : </span>
          <Switch {...isFontBoldSwitchProps}/>
        </div>
        <div className="row-container">
          <span>Italic : </span>
          <Switch {...isFontItalicSwitchProps}/>
        </div>
        <div className="row-container">
          <span>Line Through : </span>
          <Switch {...isFontLineThroughProps}/>
        </div>
      </div>
    )
  }

  /**
   * @description the operator widget for editing topic shape style
   * */
  renderShapeStyleEditWidgetArea() {
    const shapeClassSelectorProps = {
      options: optionsMap.shapeClass,
      value: this.state.shapeClass,
      onChange: (value) => this.props.dispatch({ type: 'map/setShapeClass', shapeClass: value })
    };

    const fillColorPickerProps = {
      value: this.state.fillColor,
      onChange: (value) => this.props.dispatch({ type: 'map/setFillColor', fillColor: value })
    };

    const borderWidthSelectorProps = {
      options: optionsMap.borderWidth,
      value: this.state.strokeWidth,
      onChange: (value) => this.props.dispatch({ type: 'map/setBorderWidth', borderWidth: value })
    };

    const borderColorPickerProps = {
      value: this.state.strokeColor,
      onChange: (value) => this.props.dispatch({ type: 'map/setBorderColor', borderColor: value })
    };

    return (
      <div>
        <div className="row-container">
          <span>Shape Class : </span>
          <Selector {...shapeClassSelectorProps}/>
        </div>
        <div className="row-container">
          <span>Fill Color : </span>
          <ColorPicker {...fillColorPickerProps}/>
        </div>
        <div className="row-container">
          <span>Border Width : </span>
          <Selector {...borderWidthSelectorProps}/>
        </div>
        <div className="row-container">
          <span>Border Color : </span>
          <ColorPicker {...borderColorPickerProps}/>
        </div>
      </div>
    )
  }

  renderLineStyleEditWidgetArea() {
    const lineClassSelectorProps = {
      options: optionsMap.lineClass,
      value: this.state.lineClass,
      onChange: (value) => this.props.dispatch({ type: 'map/setLineClass', lineClass: value })
    };

    const lineWidthSelectorProps = {
      options: optionsMap.lineWidth,
      value: this.state.lineWidth,
      onChange: (value) => this.props.dispatch({ type: 'map/setLineWidth', lineWidth: value })
    };

    const lineColorPickerProps = {
      value: this.state.lineColor,
      onChange: (value) => this.props.dispatch({ type: 'map/setLineColor', lineColor: value })
    };

    return (
      <div>
        <div className="row-container">
          <span>Line Class : </span>
          <Selector {...lineClassSelectorProps}/>
        </div>
        <div className="row-container">
          <span>Line Width : </span>
          <Selector {...lineWidthSelectorProps}/>
        </div>
        <div className="row-container">
          <span>Line Color : </span>
          <ColorPicker {...lineColorPickerProps}/>
        </div>
      </div>
    )
  }

  render() {
    const panelProps = {
      className: 'edit-panel topic-edit-panel',
    };

    return (
      <div { ...panelProps } >
        { this.renderTreeEditWidgetArea() }
        <div className="hr"/>
        { this.renderFontStyleEditWidgetArea() }
        <div className="hr"/>
        { this.renderShapeStyleEditWidgetArea() }
        <div className="hr"/>
        { this.renderLineStyleEditWidgetArea() }
      </div>
    );
  }
}

const mapStateToProps = ({ map }) => {
  return { selectionList: map.selectionList };
};

export default connect(mapStateToProps)(TopicEditPanel);