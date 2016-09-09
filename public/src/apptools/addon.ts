import DefaultStyle from '../constants/DefaultStyle';
import { TOPIC_SELECTED } from '../constants/EventTags';

import { events, selectionsManager, componentMapManager } from '../managers';

export const editReceiver = (() => {
  const keyMap = {
    13 : 'Enter',
    8  : 'Delete',
    46 : 'Delete',
    90 : 'Z',
    38 : "Direct",
    40 : "Direct",
    37 : "Direct",
    39 : "Direct",
    27 : 'ESC'
  };

  const input = document.createElement('input');

  input.id = 'editReceiver';

  const {minWidth, minHeight} = DefaultStyle.editReceiver;

  input.style.minWidth = minWidth + 'px';
  input.style.minHeight = minHeight + 'px';

  document.querySelector('#app-tools-container').appendChild(input);

  let currentComponent;

  // lifeCircle method
  const setShowStyle = () => {
    let { top, left, width, height } = currentComponent.getTitleClientRect();

    const style = input.style;

    // fix left and top
    if (width < minWidth) {

      left -= (minWidth - width) / 2;
      if (width === 0) {
        top -= minHeight / 2;
      }
      width = minWidth;
    }

    style.width = width + 'px';
    style.left = left + 'px';
    style.top = top + 'px';
    style.height = height + 'px';

    style.zIndex = '1';
  };

  const setHideStyle = () => {
    input.style.zIndex = '-1';

    input.value = '';
  };

  const updateText = () => {
    currentComponent.onUpdateTitle(input.value);
  };

  const onBlur = () => {

    if (!isVisible()) {
      return false;
    }


    updateText();
    setHideStyle();
  };

  const isVisible = () => {
    return Number(input.style.zIndex) > 0;
  };

  const keyDownMap = {
    'Enter' : function(e){
      if (isVisible()) {
        e.stopPropagation();
        updateText();
        setHideStyle();
      }
    },
    'ESC' : function(){
      isVisible() && setHideStyle();
    },
    'Delete' : function(e){
      isVisible() && e.stopPropagation();
    },
    'Z' : function (e) {
      if(e.metaKey){
        isVisible() ? e.stopPropagation() : e.preventDefault();
      }
    },
    'Direct' : function (e) {
      isVisible() && e.stopPropagation();
    }
  };


  // add Event
  input.addEventListener('keydown', e => {
    var which = e.which;
    which in keyMap && keyDownMap[keyMap[which]].call(this, e);
  });

  input.addEventListener('blur', () => {
    onBlur();
  });

  input.addEventListener('focus', () => {

  });

  input.addEventListener('input', () => {
    !isVisible() && setShowStyle();
  });

  input.addEventListener('copy', () => {
    if(!isVisible()) {
      currentComponent.copyTopicInfo();
    }
  });

  input.addEventListener('cut', () => {
    if(!isVisible()) {
      currentComponent.cutTopicInfo();
    }
  });

  input.addEventListener('paste', (e) => {
    if (!isVisible()) {
      e.preventDefault();
      currentComponent.pasteTopicInfo();
    }
  });

  return {
    prepare (targetComponent) {

      currentComponent = targetComponent;

      input.focus();
    },

    show (targetComponent) {

      currentComponent = targetComponent;

      setShowStyle();

      input.value = currentComponent.getTitle();

      input.focus();
      input.select();
    },

    finish () {

    }

  }
})();

// todo 
export const dragSelectReceiver = (() => {
  const dragSelectBox = document.createElement('div');
  dragSelectBox.id = 'dragSelectBox';

  const dragSelectCover = document.createElement('div');
  dragSelectCover.id = 'dragSelectCover';

  dragSelectCover.appendChild(dragSelectBox);

  document.querySelector('#app-tools-container').appendChild(dragSelectCover);

  const body = document.querySelector('body');

  let startPoint: [number, number];

  let endPoint: [number, number];

  interface selectBoxStyle {
    left: string
    top: string
    width: string
    height: string
  }

  function getSelectBoxStyle(startPoint: [number, number], endPoint: [number, number]): selectBoxStyle {
    const left = Math.min(startPoint[0], endPoint[0]) + 'px';
    const top = Math.min(startPoint[1], endPoint[1]) + 'px';
    const width = Math.abs(startPoint[0] - endPoint[0]) + 'px';
    const height = Math.abs(startPoint[1] - endPoint[1]) + 'px';

    return {left, top, width, height};
  }

  interface rectBox {
    left: number
    top: number
    width: number
    height: number
  }

  function isBoxIntersects(boxA: rectBox, boxB: rectBox): boolean {
    return boxA.left <= boxB.left + boxB.width &&
      boxA.left + boxA.width >= boxB.left &&
      boxA.top <= boxB.top + boxB.height &&
      boxA.top + boxA.height >= boxB.top;
  }


  // todo need to consider performance
  function dragMoving(e) {
    endPoint = [e.pageX, e.pageY];

    const selectBoxStyle = getSelectBoxStyle(startPoint, endPoint);

    Object.assign(dragSelectBox.style, selectBoxStyle);
    dragSelectCover.style.display = 'block';

    const selectBoxNumberData = {
      left: parseInt(selectBoxStyle.left),
      top: parseInt(selectBoxStyle.top),
      width: parseInt(selectBoxStyle.width),
      height: parseInt(selectBoxStyle.height)
    };

    const componentMap = componentMapManager.getMap();

    Object.keys(componentMap).forEach((id) => {
      const component = componentMap[id];
      const componentBoxRect = component.getGroupBoxRect();

      if (isBoxIntersects(selectBoxNumberData, componentBoxRect)) {
        selectionsManager.addSelection(component);
        if (!component.state.selected) {
          component.setState({selected: true});
        }
      } else {
        selectionsManager.removeSelection(component);
        if (component.state.selected) {
          component.setState({selected: false});
        }
      }
    });
  }

  function dragEnd() {
    body.removeEventListener('mousemove', dragMoving);
    body.removeEventListener('mouseup', dragEnd);

    dragSelectCover.style.display = 'none';

    if (selectionsManager.getSelectionsArray().length) {
      events.emit(TOPIC_SELECTED);
    }
  }

  return {
    dragStart(e) {
      startPoint = [e.pageX, e.pageY];

      body.addEventListener('mousemove', dragMoving);
      body.addEventListener('mouseup', dragEnd);
    }
  }
})();