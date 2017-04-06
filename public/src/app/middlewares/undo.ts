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

const pastStateStack = [];

const futureStateStack = [];

export const ACTION_UNDO = 'ACTION_UNDO';

export const ACTION_REDO = 'ACTION_REDO';

const actionFilterReg = /^@@router/;

export const undoMiddleware = (({ getState }) => dispatch => (action) => {

  const { type } = action;

  // if the action is router reducer / undo or redo reducer / need to ignore, just continue
  if (actionFilterReg.test(type) || type === ACTION_UNDO || type === ACTION_REDO || action.ignoreUndo) {
    return dispatch(action)
  }

  // save pastState info
  const pastState = getState();

  delayInvoking(() => {
    pastStateStack.push(pastState);
    futureStateStack.splice(0);

    hooks.onPushUndo && hooks.onPushUndo();
  });

  return dispatch(action);
});

/**
 * @description global reducer for dispatch undo or redo action
 * */
export const undoGlobalReducer = {
  [ACTION_UNDO]: (state) => {

    const pastState = pastStateStack.pop();
    if (!pastState) return state;

    futureStateStack.push(state);

    hooks.onUndoOrRedoTrigger && hooks.onUndoOrRedoTrigger();

    return pastState;
  },

  [ACTION_REDO]: (state) => {
    const futureState = futureStateStack.pop();
    if (!futureState) return state;

    pastStateStack.push(state);

    hooks.onUndoOrRedoTrigger && hooks.onUndoOrRedoTrigger();

    return futureState;
  }
};

export const hooks = {
  onPushUndo: null,
  onUndoOrRedoTrigger: null,
  hasUndo: () => !!pastStateStack.length,
  hasRedo: () => !!futureStateStack.length
};