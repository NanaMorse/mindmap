import React from 'react';

import TopicsContainer from '../containers/TopicsContainer';

import {selectionsManager} from '../managers';

class Sheet extends React.Component {

  render() {

    const sheetProps = {
      id: 'sheet',
      style: {
        backgroundColor: this.props.bgColor
      }
    };

    const sheetEvents = {
      onClick: this.onClick.bind(this),
      onWheel: this.onWheel.bind(this)
    };

    return <svg { ...sheetProps } { ...sheetEvents } >
      <TopicsContainer />
    </svg>;
  }

  onClick() {
    selectionsManager.clearSelection();
  }

  onWheel(e) {
    this.moveTopicsContainer(e.deltaX, e.deltaY);
    this.moveEditReceiver(e.deltaX, e.deltaY);
  }

  // todo try svg animation
  moveTopicsContainer(deltaX, deltaY) {
    const {topicsContainer} = this;
    const transformAttr = topicsContainer.getAttribute('transform');
    const execResult = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(transformAttr);
    const [preX, preY] = execResult ? [Number(execResult[1]), Number(execResult[2])] : [0, 0];
    const [newX, newY] = [preX - deltaX, preY - deltaY];

    topicsContainer.setAttribute('transform', `translate(${newX},${newY})`);
  }

  moveEditReceiver(deltaX, deltaY) {
    const {editReceiver} = this;

    if (editReceiver.style.zIndex < 0) return false;

    const {left: preLeft, top: preTop} = editReceiver.style;
    editReceiver.style.left = parseInt(preLeft) - deltaX + 'px';
    editReceiver.style.top = parseInt(preTop) - deltaY + 'px';
  }
  
  componentDidMount() {
    this.topicsContainer = document.querySelector('.topics-group');
    this.editReceiver = document.querySelector('#editReceiver')
  }
}

export default Sheet;