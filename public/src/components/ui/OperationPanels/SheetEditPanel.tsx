import * as React from 'react';
import { connect } from 'dva'
import * as WidgetGenerator from './widgetgenerator';
import { events, componentMapManager } from 'src/managers';
import * as CommonConstant from 'src/constants/Common';
import { appState, sheetState, extendTopicInfo } from 'src/interface'

const UpdateSheetBgColorPicker = WidgetGenerator.colorPickerGenerator('background color', 'sheet/updateSheetBackgroundColor');
const UpdateLabelModeCheckBox = WidgetGenerator.checkBoxGenerator('show label', 'onUpdateSheetInfoItemMode');

interface SheetEditPanelProps {
  app: appState
  sheet: sheetState
  selectionList: Array<extendTopicInfo>
  dispatch: Function
}

interface SheetEditPanelState {
  backgroundColor?: string
  isLabelCard?: boolean
}

class SheetEditPanel extends React.Component<SheetEditPanelProps, SheetEditPanelState> {

  static defaultProps = {
    selectionList: []
  };

  constructor(props: SheetEditPanelProps) {
    super(props);

    this.state = {
      backgroundColor: props.sheet.backgroundColor,
      isLabelCard: props.app.infoItemDisplay.label === CommonConstant.INFO_ITEM_CARD_MODE
    }
  }

  /**
   * @description color picker props for updating store and state
   * */
  generateColorPickerProps(stateKey) {
    return {
      value: this.state[stateKey],
      onChange: (id, color) => {
        this.props.dispatch({ type: id, [stateKey]: color });
        this.setState({ [stateKey]: color });
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

  render() {
    const panelProps = {
      className: 'edit-panel sheet-edit-panel',
      style: {
        display: !this.props.selectionList.length ? 'block' : 'none'
      }
    };
    
    return (
      <div {...panelProps}>
        <UpdateSheetBgColorPicker {...this.generateColorPickerProps('backgroundColor')}/>
        <UpdateLabelModeCheckBox {...this.generateInfoItemModeCheckBoxProps('isLabelCard', 'label')}/>
      </div>
    );
  }
}

const mapStateToProps = ({ sheet, app, map }) => {
  return { sheet, app, selectionList: app.selectionList }
};

export default connect(mapStateToProps)(SheetEditPanel);