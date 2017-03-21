declare namespace reactDraggable {

  interface DraggableBounds {
    left: number
    right: number
    top: number
    bottom:number
  }

  interface DraggableProps {
    axis?: string
    bounds?: DraggableBounds|string|boolean
    start?:{x:number,y:number}
    zIndex?:number
  }

  interface DraggableCoreProps {
    allowAnyClick: boolean
    disabled: boolean
    enableUserSelectHack: boolean
    grid: number[]
    handle: string
    cancel: string
    onStart: (event, ui) => boolean
    onDrag: (event, ui) => boolean
    onStop: (event, ui) => boolean
    onMouseDown: (event, ui) => boolean
  }

  export default class Draggable {}

  export class DraggableCore {}
}

declare module 'react-draggable' {
  export = reactDraggable
}