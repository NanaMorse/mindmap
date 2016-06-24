import React from 'react';

import TopicContainer from '../containers/TopicContainer';

import { eventEmitter, selectionsManager } from '../managers';

import { CPT_SELECTED } from '../constants/EventTypes';

class Sheet extends React.Component {

  componentDidMount () {
    eventEmitter.on(CPT_SELECTED, selectionsManager.addSelection);
  }
  
  render () {
    
    const sheetProps = {
      id : 'sheet',
      style : {
        backgroundColor : this.props.bgColor
      }
    };
    
    return <svg { ...sheetProps } onClick = { this.onClick.bind(this) }>
      <TopicContainer />
    </svg>;
  }

  onClick (e) {
    selectionsManager.clearSelection();
  }
}

export default Sheet;