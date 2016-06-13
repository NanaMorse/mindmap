
export default {
  
  'react' (boxSize) {

    const halfWidth = boxSize.width / 2;
    const halfHeight = boxSize.height / 2;
    
    return `M ${-halfWidth} ${-halfHeight} ${halfWidth} ${-halfHeight} ` + 
      `${halfWidth} ${halfHeight} ${-halfWidth} ${halfHeight} ` +
      `${-halfWidth} ${-halfHeight}`;
  }
  
}