import React, { Component } from 'react';

import Sheet from '../components/Sheet';

import { connect } from 'react-redux';

import * as actions from '../actions';

const mapStateToProps = (state) => {

  return state.sheet;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTopicText : (fillColor) => {
      dispatch(actions.updateSheetFillColor(fillColor));
    }
  }
};

const SheetContainer = connect(mapStateToProps, mapDispatchToProps)(Sheet);

export default SheetContainer;