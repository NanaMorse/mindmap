import React from 'react';

import TopicContainer from '../containers/TopicContainer';

import { eventEmitter, selectionsManager } from '../managers';

import { CPT_SELECTED } from '../constants/EventTypes';

class Svg extends React.Component {

  componentDidMount () {
    eventEmitter.on(CPT_SELECTED, selectionsManager.addSelection);
  }
  
  render () {
    
    const svgProps = {
      width : '100%',
      height : '100%',
      fill : this.props.fillColor
    };
    
    return <svg { ...svgProps } onClick = { this.onClick.bind(this) }>
      <TopicContainer />
    </svg>;
  }

  onClick (e) {
    selectionsManager.clearSelection();
  }
}

export default Svg;