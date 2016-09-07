import DefaultStyle from '../constants/DefaultStyle';

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

})();