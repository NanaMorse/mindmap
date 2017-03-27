import 'babel-polyfill';
import './apptools/KeyBind';
import SocketHandler from './socketHandler'
import { renderUIComponent } from './components/ui'

import * as React from 'react';
import dva from 'dva'
import { Router, Route } from 'dva/router';
import mapModel from './models/map'
import sheetModel from './models/sheet'
import appModel from './models/app'

import CoreComponent from './components/core'

// init socket handle with callback
new SocketHandler((storeData) => {
  // render core component after store data init
  const app = dva({
    initialState: storeData
  });

  app.model(appModel);
  app.model(mapModel);
  app.model(sheetModel);

  // 4. Router
  app.router(({ history }) => {
    return (
      <Router history={history}>
        <Route path="/" component={CoreComponent} />
      </Router>
    );
  });

  app.start('#sheet-container');

  // renderUIComponent()
});