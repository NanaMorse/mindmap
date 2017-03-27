import * as React from 'react'
import CoreComponent from './core'
import Header from './ui/Header'
import OperationPanel from './ui/OperationPanels'

export default () => {
  return (
    <div>
      <div id="header-container"><Header /></div>
      <div id="core-container"><CoreComponent /></div>
      <div id="operation-panel-container"><OperationPanel /></div>
    </div>
  )
}