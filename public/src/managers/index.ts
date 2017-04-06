import * as EventEmitter from 'events';
import * as CommonFunc from '../apptools/commonfunc';

export const events = new EventEmitter();

export const selectionsManager = (() => {

  const selections = [];

  const getSelectionsArray = () => {
    return selections;
  };

  // done
  const addSelection = (selection) => {

    if (selections.indexOf(selection) < 0) {
      selections.push(selection);
    }

  };

  // done
  const selectSingle = (selection) => {
    clearSelection();
    addSelection(selection);
  };

  // done
  const clearSelection = () => {

    if (!selections.length) return false;

    selections.forEach((selection) => {
      selection.onDeselected();
    });

    selections.splice(0);
  };

  const removeSelection = (selection) => {
    if ((<any>selections).includes(selection)) {
      selections.splice(selections.indexOf(selection), 1);
    }
  };


  return { getSelectionsArray, addSelection, selectSingle, clearSelection, removeSelection }
})();

export const pasteInfoManager = (() => {
  let componentInfoToBePasted;

  const refreshInfo = (info) => {
    componentInfoToBePasted = CommonFunc.deepClone(info);
  };

  const getInfo = () => {
    return CommonFunc.replaceInfoId(componentInfoToBePasted);
  };

  const hasInfoStashed = () => {
    return !!componentInfoToBePasted;
  };

  return {refreshInfo, getInfo, hasInfoStashed};
})();

export const componentMapManager = (() => {
  let sheetComponent;

  const map = {};

  return {
    addComponent(id: string, component) {
      map[id] = component;
    },

    removeComponent(id: string) {
      delete map[id];
    },

    getMap() {
      return map;
    },

    get sheetComponent() {
      return sheetComponent;
    },

    set sheetComponent(component) {
      if (sheetComponent) return;
      sheetComponent = component;
    }
  }
})();