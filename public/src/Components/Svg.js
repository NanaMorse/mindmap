import React from 'react';

import TopicContainer from '../containers/TopicContainer';

import { eventEmitter, selectionsManager } from '../managers';

import { CPT_SELECTED } from '../constants/EventTypes';

class Svg extends React.Component {

  componentDidMount () {
    eventEmitter.on(CPT_SELECTED, selectionsManager.addSelection);
  }
  
  render () {
    return <svg width="100%" height="100%" onClick = { this.onClick.bind(this) }>
      <TopicContainer />
    </svg>;
  }

  onClick (e) {
    selectionsManager.clearSelection();
  }
}

export default Svg;