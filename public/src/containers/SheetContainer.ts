import Sheet from '../components/core/Sheet';

import { connect } from 'react-redux';

import * as actions from '../actions';

const mapStateToProps = (state) => {

  return state.sheet;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchMethod: {
      updateSheetBgColor : (bgColor) => {
        dispatch(actions.updateSheetBgColor(bgColor));
      },

      updateSheetInfoItemMode: (infoItem, mode) => {
        dispatch(actions.updateSheetInfoItemMode(infoItem, mode));
      }
    }
  }
};

const SheetContainer = connect(mapStateToProps, mapDispatchToProps)(Sheet);

export default SheetContainer;