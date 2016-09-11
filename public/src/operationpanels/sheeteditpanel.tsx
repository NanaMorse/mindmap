import * as React from 'react';
import * as WidgetGenerator from './widgetgenerator';

import { events, componentMapManager } from '../managers';

import * as EventTags from '../constants/EventTags';


const UpdateSheetBgColorPicker = WidgetGenerator.colorPickerGenerator('background color', 'onUpdateSheetBgColor');

export default class extends React.Component<void, any> {
  constructor() {
    super();

    this.state = {
      show: true,
      bgColor: componentMapManager.sheetComponent.props.bgColor
    }
  }

  render() {

    const panelProps = {
      className: 'edit-panel sheet-edit-panel',
      style: {
        display: this.state.show ? 'block' : 'none'
      }
    };

    return (
      <div {...panelProps}>
        <UpdateSheetBgColorPicker {...this.generateNormalProps('bgColor')}/>
      </div>
    );
  }

  generateNormalProps(stateKey) {
    return {
      value: this.state[stateKey],
      onChange: e => this.dispatchOperator(e, stateKey)
    };
  }

  dispatchOperator(e, stateKey) {
    const widgetId = e.target.id;
    const widgetValue = e.target.value;

    componentMapManager.sheetComponent[widgetId](widgetValue);

    if (stateKey) {
      this.setState({
        [stateKey]: widgetValue
      });
    }
  }

  setPanelWidgetValue() {
    const sheetProps = componentMapManager.sheetComponent.props;

    this.setState({
      bgColor: sheetProps.bgColor
    });
  }

  componentDidMount() {
    events.on(EventTags.UNDO_OR_REDO_TRIGGERED, () => {
      this.setPanelWidgetValue();
    });
  }
}