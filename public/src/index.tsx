import 'babel-polyfill';
import './apptools/KeyBind';
import * as React from 'react';
import dva from 'dva'
import { Router, Route } from 'dva/router';
import SocketHandler from './socketHandler'
import mapModel from './models/map'
import sheetModel from './models/sheet'
import appModel from './models/app'
import AppComponent from './components'

// init socket handle with callback
new SocketHandler((storeData) => {
  // render core component after store data init
  const app = dva({
    initialState: storeData
  });

  app.model(appModel);
  app.model(mapModel);
  app.model(sheetModel);

  // set middleware
  app.use({
    onAction: ({ dispatch, getState }) => (next) => (action) => {
      console.log(getState())
      next(action)
    }
  })

  // set router
  app.router(({ history }) => {
    return (
      <Router history={history}>
        <Route path="/" component={AppComponent} />
      </Router>
    );
  });

  app.start('#app');
});