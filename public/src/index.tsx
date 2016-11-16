import 'babel-polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './components/KeyBind';

import Header from './components/Header';

import SheetContainer from './containers/SheetContainer';

import SheetEditPanel from './operationpanels/sheeteditpanel';
import TopicEditPanel from './operationpanels/topiceditpanel';

import { initStoreWithData, getStore } from './store';

const ws = new WebSocket('ws://localhost:3000');

ws.onmessage = function (msg) {
  const parsedData = JSON.parse(msg.data);
  
  switch (parsedData.type) {
    case 'getStoreData': {
      return renderApp(initStoreWithData(ws, JSON.parse(parsedData.data)));
    }
      
    case 'receiveBroadcastAction': {
      return getStore().dispatch(JSON.parse(parsedData.data));
    }
  }
};

const renderApp = (store) => {
  render(
    <Provider store = { store }>
      <SheetContainer />
    </Provider>,
    document.getElementById('sheet-container')
  );

  render(<Header />, document.getElementById('header-container'));

  render(<div>
    <TopicEditPanel />
    <SheetEditPanel />
  </div>, document.getElementById('operation-panel-container'));
};