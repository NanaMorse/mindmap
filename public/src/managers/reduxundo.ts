import store from '../store';

import { deepClone, delayInvoking } from '../apptools/commonfunc';

import { events } from '../managers';

import { undo, redo } from '../actions';

import * as EventTags from '../constants/EventTags';

interface ReduxUndoFunc {
  (mapDispatchToProps: Function, reducerKey: string):(dispatch: Function) => Object;

  undo: () => void;

  redo: () => void;

  hasUndo: () => boolean;

  hasRedo: () => boolean;
}

const pastDispatchStack = [];

const futureDispatchStack = [];

const reduxUndo = <ReduxUndoFunc>function(mapDispatchToProps, reducerKey) {
  return function (dispatch) {
    const dispatchMap = mapDispatchToProps(dispatch);

    const undoDispatchMap = {};

    Object.keys(dispatchMap).forEach(function (dispatchKey) {
      undoDispatchMap[dispatchKey] = (...args) => {
        const lastState = deepClone(store.getState());

        delayInvoking(() => {
          pastDispatchStack.push(() => {
            dispatch(undo(lastState[reducerKey]));
            return {dispatch, reducerKey};
          });

          events.emit(EventTags.PUSH_UNDO_STACK);
        });

        futureDispatchStack.splice(0);

        dispatchMap[dispatchKey](...args);
      }
    });

    return undoDispatchMap;
  };
};

reduxUndo.undo = () => {
  const pastDispatch = pastDispatchStack.pop();

  const futureState = deepClone(store.getState());

  if (pastDispatch) {
    const {dispatch, reducerKey} = pastDispatch();

    futureDispatchStack.push(() => {
      dispatch(redo(futureState[reducerKey]));
      pastDispatchStack.push(pastDispatch);
    });
  }

  events.emit(EventTags.UNDO_OR_REDO_TRIGGERED);
};

reduxUndo.redo = () => {
  const futureDispatch = futureDispatchStack.pop();
  futureDispatch && futureDispatch();

  events.emit(EventTags.UNDO_OR_REDO_TRIGGERED);
};

reduxUndo.hasUndo = () => !!pastDispatchStack.length;

reduxUndo.hasRedo = () => !!futureDispatchStack.length;

export default reduxUndo;