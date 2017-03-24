declare type mapState = {

}


declare type mapModelType = {
  namespace: string

  state: mapState

  reducers: {
    updateTopicTitle: (state: mapState, title: string) => mapState

    updateTopicFontSize: (state: mapState, fontSize: number) => mapState

    updateTopicTextColor: (state: mapState, textColor: string) => mapState

    updateTopicIsTextBold: (state: mapState, isTextBold: boolean) => mapState

    updateTopicIsTextItalic: (state: mapState, isTextItalic: boolean) => mapState

    updateTopicIsTextLineThrough: (state: mapState, isTextLineThrough: boolean) => mapState

    updateTopicShapeClass: (state: mapState, shapeClass: string) => mapState

    updateTopicBorderWidth: (state: mapState, borderWidth: number) => mapState

    updateTopicBorderColor: (state: mapState, borderColor: string) => mapState

    updateTopicLineClass: (state: mapState, lineClass: string) => mapState

    updateTopicLineWidth: (state: mapState, lineWidth: number) => mapState

    updateTopicLineColor: (state: mapState, lineColor: string) => mapState

    updateTopicFillColor: (state: mapState, fillColor: string) => mapState

    updateTopicLabelText: (state: mapState, labelText: string) => mapState

    addChildTopic: (state: mapState, index: number) => mapState

    addParentTopic: (state: mapState, parentId: string) => mapState

    removeSelf: (state: mapState) => mapState
  }
}