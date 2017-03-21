import * as React from 'react';
import * as WidgetGenerator from './widgetgenerator';

import { events, componentMapManager } from '../../../managers';

import * as EventTags from '../../../constants/EventTags';
import * as CommonConstant from '../../../constants/Common';

const UpdateSheetBgColorPicker = WidgetGenerator.colorPickerGenerator('background color', 'onUpdateSheetBgColor');
const UpdateLabelModeCheckBox = WidgetGenerator.checkBoxGenerator('show label', 'onUpdateSheetInfoItemMode');


export default class extends React.Component<void, any> {
  constructor() {
    super();

    const sheetProps = componentMapManager.sheetComponent.props;
    
    this.state = {
      show: true,
      bgColor: sheetProps.bgColor,
      isLabelCard: sheetProps.settings.infoItem.label === CommonConstant.INFO_ITEM_CARD_MODE
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
        <UpdateSheetBgColorPicker {...this.generateColorPickerProps('bgColor')}/>
        <UpdateLabelModeCheckBox {...this.generateInfoItemModeCheckBoxProps('isLabelCard', 'label')}/>
      </div>
    );
  }
  
  generateColorPickerProps(stateKey) {
    return {
      value: this.state[stateKey],
      onChange: (id, color) => {
        componentMapManager.sheetComponent[id](color);
        this.setState({
          [stateKey]: color
        });
      }
    }
  }
  
  generateInfoItemModeCheckBoxProps(stateKey: string, infoItem: string) {
    return {
      checked: this.state[stateKey],
      onClick: (e) => {
        const widgetId = e.target.id;
        const checked = e.target.checked;
        
        const mode = checked ? CommonConstant.INFO_ITEM_CARD_MODE : CommonConstant.INFO_ITEM_ICON_MODE;

        componentMapManager.sheetComponent[widgetId](infoItem, mode);

        this.setState({
          [stateKey]: checked
        });
      },
      onChange: () => {}
    }
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
      bgColor: sheetProps.bgColor,
      isLabelCard: sheetProps.settings.infoItem.label === CommonConstant.INFO_ITEM_CARD_MODE
    });
  }

  componentDidMount() {
    events.on(EventTags.UNDO_OR_REDO_TRIGGERED, () => {
      this.setPanelWidgetValue();
    });
  }
}