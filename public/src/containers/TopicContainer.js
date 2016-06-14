import { connect } from 'react-redux';

import * as actions from '../actions';

import Topic from '../components/Topic';

const mapStateToProps = (state) => {
    
    return state.topic;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick : () => {
            dispatch(actions.updateTopicText(ownProps.text))
        }
    }
};

const TopicContainer = connect(mapStateToProps, mapDispatchToProps)(Topic);

export default TopicContainer;