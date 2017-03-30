import * as React from 'react'
import SheetEditPanel from './SheetEditPanel';
import TopicEditPanel from './TopicEditPanel';
import './edit-panel-style.css'

const OperatorPanels = () => {
  return (
    <div>
      <TopicEditPanel />
      <SheetEditPanel />
    </div>
  )
};

export default OperatorPanels;