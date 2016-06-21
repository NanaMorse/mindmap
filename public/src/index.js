import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import store from './store';

import SheetContainer from './containers/SheetContainer';

render(
    <Provider store = { store }>
        <SheetContainer />
    </Provider>,
    document.getElementById('app')
);