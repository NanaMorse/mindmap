const sheetModel: sheetModelType = {
  namespace: 'sheet',

  state: {
    /**
     * @description background color of sheet
     * */
    backgroundColor: ''
  },

  reducers: {
    /**
     * @description update sheet's background color
     * */
    updateSheetBackgroundColor(state, { payload }) {
      const { backgroundColor } = payload;
      return { ...state, backgroundColor }
    }
  }
};

export default sheetModel;