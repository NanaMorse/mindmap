declare type mapState = {

}

const mapModel = {
  namespace: 'map',

  state: {

  },

  reducers: {
    updateTopicTitle(state: mapState, title: string) {
      return state
    },

    updateTopicFontSize(state: mapState, fontSize: number) {
      return state
    },

    updateTopicTextColor(state: mapState, textColor: string) {
      return state
    },

    updateTopicIsTextBold(state: mapState, isTextBold: boolean) {
      return state
    },

    updateTopicIsTextItalic(state: mapState, isTextItalic: boolean) {

    },

    updateTopicIsTextLineThrough(state: mapState, isTextLineThrough: boolean) {
      return state
    },

    updateTopicShapeClass(state: mapState, shapeClass: string) {
      return state
    },

    updateTopicBorderWidth(state: mapState, borderWidth: number) {
      return state
    },

    updateTopicBorderColor(state: mapState, borderColor: string) {
      return state
    },

    updateTopicLineClass(state: mapState, lineClass: string) {
      return state
    },

    updateTopicLineWidth(state: mapState, lineWidth: number) {
      return state
    },

    updateTopicLineColor(state: mapState, lineColor: string) {
      return state
    },

    updateTopicFillColor(state: mapState, fillColor: string) {

    },

    updateTopicLabelText(state: mapState, labelText: string) {
      return state
    },

    addChildTopic(state: mapState, index: number) {
      return state
    },

    addParentTopic(state: mapState, parentId: string) {
      return state
    },

    removeSelf(state: mapState) {
      return state
    }
  }
};

export default mapModel