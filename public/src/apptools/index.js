import * as KeyCode from '../constants/KeyCode';

export const getTextSize = (() => {
  const div = document.createElement('div');
  const body = document.querySelector('body');

  div.style.position = 'fixed';
  div.style.visibility = 'hidden';

  body.appendChild(div);

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
  const body = document.querySelector('body');

  input.style.position = 'fixed';
  input.style.visibility = 'hidden';

  body.appendChild(input);
  

  let currentComponent;

  let escCancel = false;

  // lifeCircle method
  const setShowStyle = () => {
    const clientRect = currentComponent.getTextClientRect();
    
    const style = input.style;
    style.visibility = 'visible';
    style.left = clientRect.left + 'px';
    style.top = clientRect.top + 'px';
    style.width = clientRect.width + 'px';
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
    !escCancel && currentComponent.onUpdateTopicText(input.value);
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
    }
  });

  input.addEventListener('blur', () => {
    onBlur();
  });

  return {
    start (targetComponent) {
      
      currentComponent = targetComponent;
      escCancel = false;

      setShowStyle();
      
      input.value = currentComponent.props.text;
      
      input.focus();
    }
    
  }
})();