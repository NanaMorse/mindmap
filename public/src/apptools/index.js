import * as KeyCode from '../constants/KeyCode';

const appToolsContainer = document.querySelector('#app-tools-container');

export const getTextSize = (() => {
  const div = document.createElement('div');

  div.id = 'getTextSize';

  appToolsContainer.appendChild(div);

  return (text, fontSize) => {
    div.style.fontSize = fontSize;
    div.innerText = text;

    return {
      width : div.clientWidth,
      height : div.clientHeight
    };
  }
})();


export const editReceiver = (() => {
  const input = document.createElement('input');

  input.id = 'editReceiver';

  const minWidth = 100;
  input.style.minWidth = minWidth + 'px';

  appToolsContainer.appendChild(input);
  

  let currentComponent;

  let escCancel = false;

  // lifeCircle method
  const setShowStyle = () => {
    let { top, left, width, height } = currentComponent.getTextClientRect();
    const style = input.style;
    
    // fix left and top
    if (width < minWidth) {
      left -= (minWidth - width) / 2;
      if (width === 0) {
        const defaultHeight = parseInt(currentComponent.props.fontSize) || 16;

        height = defaultHeight;
        top -= defaultHeight / 2;
      }
    } else {
      style.width = width + 'px';
    }
    
    style.left = left + 'px';
    style.top = top + 'px';
    style.height = height + 'px';

    style.visibility = 'visible';
  };
  
  const setHideStyle = () => {
    input.style.visibility = 'hidden';
  };

  const onEnterPressed = () => {
    input.blur();
  };
  
  const onEscPressed = () => {
    escCancel = true;
    input.blur();
  };
  
  const onBlur = () => {
    
    
    !escCancel && currentComponent.onUpdateText(input.value);
    setHideStyle();
  };

  // add Event
  input.addEventListener('keydown', e => {
    switch (e.which) {
      case KeyCode.ENTER_KEY : {
        return onEnterPressed(e);
      }

      case KeyCode.ESCAPE_KEY : {
        return onEscPressed(e);
      }
        
      default : {
        setShowStyle();
      }
    }
    
    console.log('keydown');
  });

  input.addEventListener('blur', () => {
    onBlur();
  });
  
  input.addEventListener('focus', () => {
    console.log('focus');
  });

  return {
    prepare (targetComponent) {
      console.log('prepare');
      
      currentComponent = targetComponent;
      escCancel = false;
      
      //input.focus();
    },
    
    show () {
      
      setShowStyle();
      
      input.value = currentComponent.props.text;
      
      input.focus();
      input.select();
    },
    
    finish () {
      
    }
    
  }
})();