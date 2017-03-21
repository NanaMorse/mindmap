import * as React from 'react'
import SheetEditPanel from './sheeteditpanel';
import TopicEditPanel from './topiceditpanel';

const OperatorPanels = () => {
  return (
    <div>
      <TopicEditPanel />
      <SheetEditPanel />
    </div>
  )
};

export default OperatorPanels;