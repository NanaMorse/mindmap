import * as React from 'react'
import CoreComponent from './core'
import Header from './ui/Header'
import OperationPanel from './ui/OperationPanels'
require('./index.scss');

export default () => {
  return (
    <div>
      <Header />
      <main>
        <CoreComponent />
        <OperationPanel />
      </main>
    </div>
  )
}