
namespace appModelNS {
  /** app setting state */
  export interface state {
    /** info item display mode */
    infoItemDisplay: {
      [index: string]: 'card' | 'icon'
    }
  }
}

declare type appState = appModelNS.state

interface appModelType {
  namespace: string

  state: appState

  reducers: {

  }
}

