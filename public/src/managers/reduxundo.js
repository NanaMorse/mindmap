import store from '../store';

import {deepAssign} from '../apptools';

import {undo} from '../actions'

const undoStack = [];

const reduxUndo = (mapDispatchToProps, reducerKey) => {

    return function (dispatch) {
        const dispatchMap = mapDispatchToProps(dispatch);

        const undoDispatchMap = {};

        Object.keys(dispatchMap).forEach(function (dispatchKey) {
            undoDispatchMap[dispatchKey] = (...args) => {

                // todo undo register here
                const lastState = deepAssign({}, store.getState());

                undoStack.push(() => dispatch(undo(lastState[reducerKey])));

                dispatchMap[dispatchKey](...args);

                console.log(store.getState());
            }
        });

        return undoDispatchMap;
    };
};

window.reduxUndo = reduxUndo;

reduxUndo.undo = () => {
    undoStack.pop()();
};

export default reduxUndo;