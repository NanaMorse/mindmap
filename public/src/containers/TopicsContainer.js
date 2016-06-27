import { connect } from 'react-redux';

import React from 'react';

import * as actions from '../actions';

import Topic from '../components/Topic';

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

const Topics = (props) => {
    
    const { defaultStyle, feed, topicById } = props;
    
    const { onUpdateTopicText } = props;
    
    const createTopic = id => {
        
        const topicProps = {
            key : id,
            topicInfo : topicById[id],
            defaultStyle,
            onUpdateTopicText
        };
        
        
        return <Topic { ...topicProps } ></Topic>;
    };
    
    return <g className = "topics-group" >{ feed.map(createTopic) }</g>;
};

const TopicsContainer = connect(mapStateToProps, mapDispatchToProps)(Topics);

export default TopicsContainer;