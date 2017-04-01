import * as React from 'react';
import { Button } from './antd'
import { undoMiddleware } from 'src/store/middlewares/undo';


interface HeaderState {
  hasUndo: boolean;
  hasRedo: boolean;
}

export default class Header extends React.Component<void, HeaderState> {

  constructor() {
    super();
  }

  render() {

    const undoBtnProps = {
      type: "primary",
      disabled: true,
      onClick: () => null
    };

    const redoBtnProps = {
      type: "primary",
      disabled: true,
      onClick: () => null
    };

    return (
      <div className="header">
        <Button {...undoBtnProps}>Undo</Button>
        <Button {...redoBtnProps}>Redo</Button>
      </div>
    );
  }
}