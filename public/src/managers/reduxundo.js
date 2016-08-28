import store from '../store';

import {deepAssign, delayInvoking} from '../apptools';

import {events} from '../managers';

import {undo, redo} from '../actions';

import * as EventTags from '../constants/EventTags';

const pastDispatchStack = [];

const futureDispatchStack = [];

const reduxUndo = (mapDispatchToProps, reducerKey) => {

  return function (dispatch) {
    const dispatchMap = mapDispatchToProps(dispatch);

    const undoDispatchMap = {};

    Object.keys(dispatchMap).forEach(function (dispatchKey) {
      undoDispatchMap[dispatchKey] = (...args) => {
        const lastState = deepAssign({}, store.getState());

        delayInvoking(() => {
          pastDispatchStack.push(() => {
            dispatch(undo(lastState[reducerKey]));
            return {dispatch, reducerKey};
          });
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

  const futureState = deepAssign({}, store.getState());

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

export default reduxUndo;