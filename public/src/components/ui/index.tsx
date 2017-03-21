import * as React from 'react';
import { render } from 'react-dom';
import OperatorPanels from './operationpanels'
import Header from './Header'

export function renderUIComponent() {
  // render Header
  render(<Header />, document.getElementById('header-container'));

  // render operatorPanel
  render(<OperatorPanels />, document.getElementById('operation-panel-container'));
}