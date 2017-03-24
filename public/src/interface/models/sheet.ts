
namespace modelNS {
  /** state */
  export interface state {
    /** sheet's background color */
    backgroundColor: string
  }

  /** reducer params define */
  export namespace params {
    export interface updateSheetBackgroundColor {
      payload: {
        backgroundColor: string
      }
    }
  }
}

declare type sheetState = modelNS.state

declare type sheetModelType = {
  namespace: string

  state: sheetState

  reducers: {
    /** update sheet's background color */
    updateSheetBackgroundColor: (state: sheetState, param: modelNS.params.updateSheetBackgroundColor) => sheetState
  }
}