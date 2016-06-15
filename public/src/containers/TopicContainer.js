import { connect } from 'react-redux';

import * as actions from '../actions';

import Topic from '../components/Topic';

const mapStateToProps = (state) => {
    
    return state.topic;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onUpdateTopicText : () => {
            //dispatch(actions.updateTopicText(ownProps.text))
            
            console.log('Hi, updated', dispatch, ownProps);
        }
    }
};

const TopicContainer = connect(mapStateToProps, mapDispatchToProps)(Topic);

export default TopicContainer;