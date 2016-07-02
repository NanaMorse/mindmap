import React from 'react';

import TopicsContainer from '../containers/TopicsContainer';

import { selectionsManager } from '../managers';

class Sheet extends React.Component {
  
  render () {
    
    const sheetProps = {
      id : 'sheet',
      style : {
        backgroundColor : this.props.bgColor
      }
    };
    
    return <svg { ...sheetProps } onClick = { this.onClick.bind(this) }>
      <TopicsContainer />
    </svg>;
  }

  onClick () {
    selectionsManager.clearSelection();
  }
}

export default Sheet;