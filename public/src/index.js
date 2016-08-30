import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import './components/KeyBind';

import Header from './components/Header';

import SheetContainer from './containers/SheetContainer';

import TopicEditPanel from './operationpanels/topiceditpanel';

render(
        <Provider store = { store }>
            <SheetContainer />
        </Provider>,
    document.getElementById('sheet-container')
);


render(<Header />, document.getElementById('header-container'));
render(<TopicEditPanel />, document.getElementById('operation-panel-container'));