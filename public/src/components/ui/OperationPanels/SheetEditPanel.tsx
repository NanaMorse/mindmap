import * as React from 'react';
import { connect } from 'dva'
import { ColorPicker } from '../antd'
import { appState, sheetState, extendTopicInfo } from 'src/interface'

interface SheetEditPanelProps {
  app: appState
  sheet: sheetState
  selectionList: Array<extendTopicInfo>
  dispatch: Function
}

class SheetEditPanel extends React.Component<SheetEditPanelProps, any> {

  static defaultProps = {
    selectionList: []
  };

  render() {
    const panelProps = {
      className: 'edit-panel sheet-edit-panel',
      style: {
        display: !this.props.selectionList.length ? 'block' : 'none'
      }
    };

    const backgroundColorPickerProps = {
      value: this.props.sheet.backgroundColor,
      onChange: (value) => this.props.dispatch({ type: 'sheet/setBackgroundColor', backgroundColor: value })
    };
    
    return (
      <div {...panelProps}>
        <div className="row-container">
          <span>Background Color : </span>
          <ColorPicker {...backgroundColorPickerProps}/>
        </div>
        <div className="hr"/>
      </div>
    );
  }
}

const mapStateToProps = ({ sheet, app, map }) => {
  return { sheet, app, selectionList: map.selectionList }
};

export default connect(mapStateToProps)(SheetEditPanel);