const EventEmitter = require('events');

export const eventEmitter = new EventEmitter;


export const selectionsManager = (() => {

  const selections = [];

  const getSelectionsArray = () => {
    return selections;
  };

  const addSelection = (selection) => {

    selections.push(selection);

  };
  
  const clearSelection = () => {
    selections.forEach((selection) => {
      selection.setState({ selected : false });
    });

    selections.splice(0, selections.length);
  };
  
  return { getSelectionsArray, addSelection, clearSelection }
})();