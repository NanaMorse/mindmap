export interface SheetDispatchMethods {
  updateSheetBgColor: Function
  updateSheetInfoItemMode: Function
}

export interface TopicDispatchMethods {
  onUpdateTitle: Function
  onUpdateFontSize: Function
  onUpdateFillColor: Function
  onAddChildTopic: Function
  onAddParentTopic: Function
  onRemoveSelfTopic: Function
  onUpdateLabel: Function
  onUpdateShapeClass: Function
  onUpdateStrokeWidth: Function
  onUpdateStrokeColor: Function
  onUpdateLineClass: Function
  onUpdateLineWidth: Function
  onUpdateLineColor: Function
  onUpdateFontColor: Function
  onUpdateIsFontBold: Function
  onUpdateIsFontItalic: Function
  onUpdateIsFontLineThrough: Function
}

export interface TopicInfo {
  id: string

  type: string

  title: string

  label: string

  parentId?: string

  index: number

  boxSize: {
    width: number
    height: number
  }

  labelBoxSize: {
    width: number
    height: number
  }

  titleAreaSize: {
    width: number
    height: number
  }

  bounds: {
    width: number
    height: number
  }

  position: [number, number]

  children: TopicInfo[]

  style: {
    shapeClass: string

    fillColor: string

    strokeWidth: string

    strokeColor: string

    fontSize: string

    fontColor: string

    isFontBold?: boolean

    isFontItalic?: boolean

    isFontLineThrough?: boolean

    lineClass: string

    lineWidth: string

    lineColor: string
  }

  originTopicInfo: Object
}