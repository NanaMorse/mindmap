import { connect } from 'react-redux';

import React from 'react';

import * as actions from '../actions';

import Topic from '../components/Topic';

const mapStateToProps = (state) => {
    
    return state.topics;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateTopicText : (newText) => {
            dispatch(actions.updateTopicText(newText));
        }
    }
};

const Topics = ({defaultStyle, feed, topicById}) => {
    
    const createTopic = id => {
        return <Topic key = { id } topicInfo = { topicById[id] } defaultStyle = { defaultStyle }></Topic>;
    };
    
    return <g className = "topics-group" >{ feed.map(createTopic) }</g>;
};

const TopicsContainer = connect(mapStateToProps, mapDispatchToProps)(Topics);

export default TopicsContainer;