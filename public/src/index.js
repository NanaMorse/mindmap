import React from 'react';
import ReactDom from 'react-dom';

import Svg from './components/Svg';

class App extends React.Component {
  render () {
    return <Svg />
  }
}

ReactDom.render(<App />, document.getElementById('app'));