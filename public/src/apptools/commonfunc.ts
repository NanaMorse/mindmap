export const getTextSize = (() => {
  const p = document.createElement('p');

  p.id = 'getTextSize';

  document.querySelector('#app-tools-container').appendChild(p);

  return (text, fontSize) => {
    p.style.fontSize = fontSize;
    p.innerText = text;

    return {
      width : p.clientWidth,
      height : p.clientHeight
    };
  }
})();

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

export const replaceInfoId = (topicInfo) => {
  const infoCopy = deepClone(topicInfo);

  _replaceId(infoCopy);

  return infoCopy;

  function _replaceId(info = infoCopy) {
    info.id = generateUUID();
    info.children && info.children.forEach(child => _replaceId(child));
  }
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
  if (getTextSize(text, fontSize).width <= maxWidth) return text;

  const ellipsisLength = getTextSize('...', fontSize).width;

  let wrapResult = '';

  sliceText();

  return wrapResult + '...';

  function sliceText(textToSlice: string = text) {
    if (textToSlice.length === 1) return textToSlice;

    const slicePart1 = textToSlice.slice(0, parseInt(textToSlice.length / 2 + ''));
    const slicePart2 = textToSlice.replace(slicePart1, '');

    if (getTextSize(wrapResult + slicePart1, fontSize).width > maxWidth - ellipsisLength) sliceText(slicePart1);
    else {
      wrapResult += slicePart1;
      sliceText(slicePart2);
    }
  }
};
