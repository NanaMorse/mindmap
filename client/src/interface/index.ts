export declare type appState = {
  /**
   * @description display mod of info item
   * */
  infoItemDisplay: {
    label: 'card' | 'icon'
  }
  /**
   * @description 是否正在获取初始化state
   * */
  receivingInitState: boolean
}

export declare type sheetState = {
  backgroundColor: string
}

export declare type mapState = {
  topicTree: topicInfo
  selectionList: Array<string>
  mapStructure: string
}

/**
 * @description interface of topic tree info, it's also the map info in store data
 * */
export interface topicInfo {
  /**
   * @description topic's uuid
   * */
  id: string

  /**
   * @description topic's title
   * @default "TOPIC"
   * */
  title?: string

  /**
   * @description label's text
   * */
  label?: string

  /**
   * @description topic's style
   * */
  style?: {
    lineClass?: string

    shapeClass?: string

    textColor?: string

    fillColor?: string

    fontSize?: string

    fontColor?: string

    strokeWidth?: string

    lineWidth?: string

    lineColor?: string

    strokeColor?: string

    isFontBold?: boolean

    isFontItalic?: boolean

    isFontLineThrough?: boolean
  }

  /**
   * @description the collection of child topic
   * */
  children?: Array<topicInfo>
}

/**
 * @description interface of extended topic tree info, only exists in running time. extended in src/components/core/Map/index.tsx
 * */
export interface extendTopicInfo extends topicInfo {

  /**
   * @description the index of current topic in parent's children collection
   * */
  index: number

  /**
   * @description the size of topic's title
   * */
  titleAreaSize: {
    width: number
    height: number
  }

  /**
   * @description the size of topic self's svg box
   * */
  boxSize: {
    width: number
    height: number
  }

  labelBoxSize: {
    width: number
    height: number
  }

  /**
   * @description the size of current topic with it's children
   * */
  bounds: {
    width: number
    height: number
  }

  /**
   * @description
   * */
  childrenBounds: {
    width: number
    height: number
  }

  /**
   * @description the position of current topic
   * */
  position: [number, number]

  /**
   * @description parent's uuid
   * */
  parentId: string

  /**
   * @description topic's type
   * */
  type: string

  /**
   * @description a copy of origin topic info
   * */
  originTopicInfo: topicInfo

  /**
   * @description the collection of child topic
   * */
  children?: Array<extendTopicInfo>
}