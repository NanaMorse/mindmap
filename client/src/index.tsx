import 'babel-polyfill'
import './apptools/KeyBind'
import * as React from 'react'
import SocketHandler from './socketHandler'
import app from './app'

import './css/main.css'
import './css/components/topic.css'

// init socket handle with callback
new SocketHandler((storeData, wsInstance) => {
  app.start({
    initialState: storeData,
    wrapperElem: '#app',
    wsInstance,
  });
});