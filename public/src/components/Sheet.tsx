import * as React from 'react';

import TopicsContainer from '../containers/TopicsContainer';

import { componentMapManager, selectionsManager } from '../managers';

import { dragSelectReceiver } from '../apptools/addon';

import { SheetDispatchFuncs } from '../interface';

interface SheetProps extends SheetDispatchFuncs {
  bgColor: string;
  settings: {
    infoItem: {}
  }
}

class Sheet extends React.Component<SheetProps, void> {

  topicsContainer: HTMLElement;

  editReceiver: HTMLElement;

  onClick() {
    //selectionsManager.clearSelection();
  }

  onWheel(e) {
    e.preventDefault();
    this.moveTopicsContainer(e.deltaX, e.deltaY);
    this.moveEditReceiver(e.deltaX, e.deltaY);
  }

  onMouseDown(e) {
    selectionsManager.clearSelection();
    dragSelectReceiver.dragStart(e);
  }

  // todo try svg animation
  moveTopicsContainer(deltaX, deltaY) {
    if (deltaX === 0 && deltaY === 0) return false;

    const {topicsContainer} = this;
    const transformAttr = topicsContainer.getAttribute('transform');
    const execResult = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(transformAttr);
    const [preX, preY] = execResult ? [Number(execResult[1]), Number(execResult[2])] : [0, 0];
    const [newX, newY] = [preX - deltaX, preY - deltaY];

    topicsContainer.setAttribute('transform', `translate(${newX},${newY})`);
  }

  moveEditReceiver(deltaX, deltaY) {
    if (deltaX === 0 && deltaY === 0) return false;

    const {editReceiver} = this;

    if (Number(editReceiver.style.zIndex) < 0) return false;

    const {left: preLeft, top: preTop} = editReceiver.style;
    editReceiver.style.left = parseInt(preLeft) - deltaX + 'px';
    editReceiver.style.top = parseInt(preTop) - deltaY + 'px';
  }

  onUpdateSheetBgColor(bgColor) {
    this.props.updateSheetBgColor(bgColor);
  }

  componentDidMount() {
    this.topicsContainer = document.querySelector('.topics-group') as HTMLElement;
    this.editReceiver = document.querySelector('#editReceiver') as HTMLElement;

    componentMapManager.sheetComponent = this;
  }

  render() {
    const sheetProps = {
      id: 'sheet',
      style: {
        backgroundColor: this.props.bgColor
      }
    };

    const sheetEvents = {
      onClick: () => this.onClick(),
      onWheel: (e) => this.onWheel(e),
      onMouseDown: (e) => this.onMouseDown(e)
    };
    
    const topicSettings = {
      infoItem: this.props.settings.infoItem
    };

    return <svg { ...sheetProps } { ...sheetEvents } >
      <TopicsContainer {...topicSettings}/>
    </svg>;
  }
}

export default Sheet;