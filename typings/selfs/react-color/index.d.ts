declare namespace reactColor {
  export class SketchPicker extends __React.Component<any, any> {}
  export class SwatchesPicker extends __React.Component<any, any> {}
}

declare module 'react-color' {
  export = reactColor
}