import * as React from 'react';

import Sheet from '../components/Sheet';

import { connect } from 'react-redux';

import * as actions from '../actions';

const mapStateToProps = (state) => {

  return state.sheet;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSheetBgColor : (bgColor) => {
      dispatch(actions.updateSheetBgColor(bgColor));
    }
  }
};

const SheetContainer = connect(mapStateToProps, mapDispatchToProps)(Sheet);

export default SheetContainer;