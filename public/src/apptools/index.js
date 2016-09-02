import * as KeyCode from '../constants/KeyCode';
import DefaultStyle from '../constants/DefaultStyle';

const appToolsContainer = document.querySelector('#app-tools-container');

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

export const getTextSize = (() => {
  const p = document.createElement('p');

  p.id = 'getTextSize';

  appToolsContainer.appendChild(p);

  return (text, fontSize) => {
    p.style.fontSize = fontSize;
    p.innerText = text;

    return {
      width : p.clientWidth,
      height : p.clientHeight
    };
  }
})();

export const editReceiver = (() => {
  const input = document.createElement('input');

  input.id = 'editReceiver';

  const {minWidth, minHeight} = DefaultStyle.editReceiver;

  input.style.minWidth = minWidth + 'px';
  input.style.minHeight = minHeight + 'px';

  appToolsContainer.appendChild(input);
  
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

    style.zIndex = 1;
  };

  const setHideStyle = () => {
    input.style.zIndex = -1;

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
    return input.style.zIndex > 0;
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

  return {
    prepare (targetComponent) {

      currentComponent = targetComponent;
      
      input.focus();
    },

    show () {

      setShowStyle();

      input.value = currentComponent.getTitle();

      input.focus();
      input.select();
    },

    finish () {

    }

  }
})();

// seems like useless?
export const deepAssign = (target, ...options) => {
  options.forEach(opt => {
    for (let key in opt) {
      if (opt.hasOwnProperty(key)) {

        const aim = target[key];
        const src = opt[key];

        if (aim === src) {
          continue;
        }

        if (src && typeof src === 'object') {
          let clone;

          if (Array.isArray(src)) {
            clone = Array.isArray(aim) ? aim : [];
          } else {
            clone = typeof aim === 'object' ? aim : {};
          }

          target[key] = deepAssign(clone, src);
        } else {
          target[key] = src;
        }

      }
    }
  });

  return target;
};

export const deepClone = (target) => {
  return JSON.parse(JSON.stringify(target));
};

export const generateUUID = () => {
  return 'xxxyxxxxxxxyxxxxxxxxxyxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const delayInvoking = (() => {

  let firstInvoke;
  
  return (invokeToDelay) => {
    firstInvoke = firstInvoke || invokeToDelay;

    setTimeout(() => {
      if (firstInvoke) {
        firstInvoke();
        firstInvoke = null;
      }
    }, 0);
  }
})();

export const wrapTextWithEllipsis  = (text, fontSize, maxWidth) => {
  if (getTextSize(text, fontSize).width < maxWidth) return text;

  const ellipsisLength = getTextSize('...', fontSize);

  let wrapResult = '';
  
  sliceText();

  return wrapResult + '...';

  function sliceText(textToSlice = text) {
    if (textToSlice.length === 1) return textToSlice;
    
    const slicePart1 = textToSlice.slice(0, parseInt(textToSlice.length / 2));
    const slicePart2 = textToSlice.replace(slicePart1, '');
    
    if (getTextSize(wrapResult + slicePart1, fontSize).width > maxWidth - ellipsisLength) sliceText(slicePart1);
    else {
      wrapResult += slicePart1;
      sliceText(slicePart2);
    }
  }
};