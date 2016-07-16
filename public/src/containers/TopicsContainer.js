import { connect } from 'react-redux';

import React, { Component } from 'react';

import * as actions from '../actions';

import Topics from '../components/Topics';

const mapStateToProps = (state) => {

  return state.topics;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateText : (id, newText) => {
      dispatch(actions.updateTopicText(id, newText));
    },
    
    onUpdateFontSize : (id, newFontSize) => {
      dispatch(actions.updateTopicFontSize(id, newFontSize))
    },
    
    onUpdateFillColor : (id, newFillColor) => {
      dispatch(actions.updateTopicFillColor(id, newFillColor))
    }
  }
};


const TopicsContainer = connect(mapStateToProps, mapDispatchToProps)(Topics);

export default TopicsContainer;