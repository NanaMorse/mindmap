

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

  const setStyle = () => {
    const clientRect = currentComponent.getTextClientRect();
    
    const style = input.style;
    style.visibility = 'visible';
    style.left = clientRect.left + 'px';
    style.top = clientRect.top + 'px';
  };

  return {
    start (targetComponent) {
      
      currentComponent = targetComponent;

      setStyle();
      
      
    }
    
  }
})();