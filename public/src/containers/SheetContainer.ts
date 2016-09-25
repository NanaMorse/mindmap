import * as React from 'react';

import Sheet from '../components/Sheet';

import { connect } from 'react-redux';

import * as actions from '../actions';

import reduxUndo from '../managers/reduxundo';

const reducerKey = 'sheet';

const mapStateToProps = (state) => {

  return state.sheet;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSheetBgColor : (bgColor) => {
      dispatch(actions.updateSheetBgColor(bgColor));
    },

    updateSheetInfoItemMode: (infoItem, mode) => {
      dispatch(actions.updateSheetInfoItemMode(infoItem, mode));
    }
  }
};

const SheetContainer = connect(mapStateToProps, reduxUndo(mapDispatchToProps, reducerKey))(Sheet);

export default SheetContainer;