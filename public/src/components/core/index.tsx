import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import SheetContainer from '../../containers/SheetContainer';

export function renderCoreComponent(store) {
  render(
    <Provider store = { store }>
      <SheetContainer />
    </Provider>,
    document.getElementById('sheet-container')
  );
}