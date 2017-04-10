import { deepClone } from 'src/apptools/commonfunc'
import { sheetState, appState, mapState } from 'src/interface'

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

interface globalState {
  sheet: sheetState
  app: appState
  map: mapState
}

const pastStateStack: Array<globalState> = [];

const futureStateStack: Array<globalState> = [];

export const ACTION_UNDO = 'ACTION_UNDO';

export const ACTION_REDO = 'ACTION_REDO';

export const undoMiddleware = (({ getState }) => dispatch => (action) => {

  const { type } = action;

  // if the action is router reducer / undo or redo reducer / need to ignore, just continue
  if (/^@@router/.test(type) || type === ACTION_UNDO || type === ACTION_REDO || action.ignoreUndo) {
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
  [ACTION_UNDO]: (state: globalState): globalState => {

    const pastState = pastStateStack.pop();
    if (!pastState) return state;

    futureStateStack.push(state);

    hooks.onUndoOrRedoTrigger && hooks.onUndoOrRedoTrigger();

    // selectionList remain the same
    pastState.map.selectionList = deepClone(state.map.selectionList);

    return pastState;
  },

  [ACTION_REDO]: (state: globalState): globalState => {
    const futureState = futureStateStack.pop();
    if (!futureState) return state;

    pastStateStack.push(state);

    hooks.onUndoOrRedoTrigger && hooks.onUndoOrRedoTrigger();

    futureState.map.selectionList = deepClone(state.map.selectionList);

    return futureState;
  }
};

export const hooks = {
  onPushUndo: null,
  onUndoOrRedoTrigger: null,
  hasUndo: () => !!pastStateStack.length,
  hasRedo: () => !!futureStateStack.length
};