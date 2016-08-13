import store from '../store';

import {deepAssign, delayInvoking} from '../apptools';

import {undo, redo} from '../actions'

const pastDispatchStack = global.pastStack = [];

global.pastStateStack = [];

const futureDispatchStack = [];

const reduxUndo = (mapDispatchToProps, reducerKey) => {

  return function (dispatch) {
    const dispatchMap = mapDispatchToProps(dispatch);

    const undoDispatchMap = {};

    Object.keys(dispatchMap).forEach(function (dispatchKey) {
      undoDispatchMap[dispatchKey] = (...args) => {
        // todo undo register here
        const lastState = deepAssign({}, store.getState());

        delayInvoking(() => {
          pastDispatchStack.push(() => {
            dispatch(undo(lastState[reducerKey]));
            return {dispatch, reducerKey};
          });

          global.pastStateStack.push(lastState[reducerKey]);
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
};

reduxUndo.redo = () => {
  const futureDispatch = futureDispatchStack.pop();
  futureDispatch && futureDispatch();
};

export default reduxUndo;