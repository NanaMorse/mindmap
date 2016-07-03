import { connect } from 'react-redux';

import React, { Component } from 'react';

import * as actions from '../actions';

import Topics from '../components/Topics';

const mapStateToProps = (state) => {

  return state.topics;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTopicText : (id, newText) => {
      dispatch(actions.updateTopicText(id, newText));
    }
  }
};


const TopicsContainer = connect(mapStateToProps, mapDispatchToProps)(Topics);

export default TopicsContainer;