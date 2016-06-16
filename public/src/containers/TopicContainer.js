import { connect } from 'react-redux';

import * as actions from '../actions';

import Topic from '../components/Topic';

const mapStateToProps = (state) => {
    
    return state.topic;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateTopicText : (newText) => {
            dispatch(actions.updateTopicText(newText));
        }
    }
};

const TopicContainer = connect(mapStateToProps, mapDispatchToProps)(Topic);

export default TopicContainer;