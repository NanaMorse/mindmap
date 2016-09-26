const delayInvoking = (() => {

  let firstInvoke;

  return (invokeToDelay) => {
    firstInvoke = firstInvoke || invokeToDelay;

    setTimeout(() => {
      if (firstInvoke) {
        firstInvoke();
        firstInvoke = null;
      }
    }, 0);
  }
})();

const ACTION_UNDO_ = 'ACTION_UNDO_';
const ACTION_REDO_ = 'ACTION_REDO_';

interface undoMiddleware {
  (store: any) : (dispatch: any) => (action: any) => any

  undo: () => void;

  redo: () => void;

  hasUndo: () => boolean;

  hasRedo: () => boolean;

  onUndoPush?: Function;

  onUndoOrRedoInvoke?: Function
}

let _dispatch, _store;

const pastStateStack = [];

const futureStateStack = [];

export const undoMiddleware = <undoMiddleware>(store => dispatch => action => {

  if (!_dispatch) _dispatch = dispatch;
  if (!_store) _store = store;

  // save pastState info
  const pastState = store.getState();

  delayInvoking(() => {
    pastStateStack.push(pastState);
    futureStateStack.splice(0);
    undoMiddleware.onUndoPush && undoMiddleware.onUndoPush();
  });

  return dispatch(action);
});

undoMiddleware.undo = () => {

  const pastState = pastStateStack.pop();

  if (pastState) {

    const futureState = _store.getState();

    _dispatch({
      type: ACTION_UNDO_,
      pastState: pastState
    });

    undoMiddleware.onUndoOrRedoInvoke && undoMiddleware.onUndoOrRedoInvoke();

    futureStateStack.push(futureState);
  }
};

undoMiddleware.redo = () => {
  const futureState = futureStateStack.pop();

  if (futureState) {

    const pastState = _store.getState();

    _dispatch({
      type: ACTION_REDO_,
      futureState: futureState
    });

    undoMiddleware.onUndoOrRedoInvoke && undoMiddleware.onUndoOrRedoInvoke();

    pastStateStack.push(pastState);
  }
};

undoMiddleware.hasUndo = () => !!pastStateStack.length;

undoMiddleware.hasRedo = () => !!futureStateStack.length;

export const CombineUndoReducer = (reducer) => (state = {}, action) => {
  switch (action.type) {
    case ACTION_UNDO_ : {
      return action.pastState;
    }

    case ACTION_REDO_ : {
      return action.futureState;
    }
  }

  return reducer(state, action);
};