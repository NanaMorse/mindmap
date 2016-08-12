import { connect } from 'react-redux';

import React, { Component } from 'react';

import * as actions from '../actions';

import Topics from '../components/Topics';

import reduxUndo from '../managers/reduxundo';

const reducerKey = 'topics';

const mapStateToProps = (state) => {
  return state.topics;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTitle : (id, newTitle) => {
      dispatch(actions.updateTopicTitle(id, newTitle));
    },

    onUpdateFontSize : (id, newFontSize) => {
      dispatch(actions.updateTopicFontSize(id, newFontSize));
    },

    onUpdateFillColor : (id, newFillColor) => {
      dispatch(actions.updateTopicFillColor(id, newFillColor));
    },
    
    onAddChildTopic : (id, childId) => {
      dispatch(actions.addChildTopic(id, childId));
    },
    
    onRemoveSelfTopic : (id) => {
      dispatch(actions.removeSelfTopic(id));
    }
  }
};


const TopicsContainer = connect(mapStateToProps, reduxUndo(mapDispatchToProps, reducerKey))(Topics);

export default TopicsContainer;