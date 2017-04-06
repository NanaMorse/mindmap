import * as React from 'react'
import { events } from 'src/managers'
import { UNDO_OR_REDO_TRIGGERED, PUSH_UNDO_STACK } from 'src/constants/EventTags'
import { Button } from './antd'
import { ACTION_UNDO, ACTION_REDO, hooks } from 'src/app/middlewares/undo';
import app from 'src/app'

interface HeaderState {
  hasUndo: boolean;
  hasRedo: boolean;
}

export default class Header extends React.Component<void, HeaderState> {

  constructor() {
    super();

    this.state = {
      hasUndo: false,
      hasRedo: false
    }
  }

  componentDidMount() {
    events.on(PUSH_UNDO_STACK, () => {
      this.setState({ hasUndo: true, hasRedo: false });
    });

    events.on(UNDO_OR_REDO_TRIGGERED, () => {
      this.setState({ hasUndo: hooks.hasUndo(), hasRedo: hooks.hasRedo() });
    })
  }

  render() {
    const undoBtnProps = {
      type: "primary",
      disabled: !this.state.hasUndo,
      onClick: () => app.dispatch({ type: ACTION_UNDO })
    };

    const redoBtnProps = {
      type: "primary",
      disabled: !this.state.hasRedo,
      onClick: () => app.dispatch({ type: ACTION_REDO })
    };

    return (
      <div className="header">
        <Button {...undoBtnProps}>Undo</Button>
        <Button {...redoBtnProps}>Redo</Button>
      </div>
    );
  }
}