import { sheetState } from 'src/interface'

const sheetModel = {
  namespace: 'sheet',

  state: <sheetState>{
    backgroundColor: ''
  },

  reducers: {
    /**
     * @description update sheet's background color
     * */
    setBackgroundColor(state: sheetState, { backgroundColor }: { backgroundColor: string }): sheetState {
      return { ...state, backgroundColor }
    }
  }
};

export default sheetModel;