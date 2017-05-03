import { appState } from 'src/interface'

const appModel = {
  namespace: 'app',

  state: <appState> {
    // info item的显示方式
    infoItemDisplay: {},
    // 正在获取init state数据
    receivingInitState: true
  },

  reducers: {
    /**
     * @description 获取初始化数据成功
     * */
    receiveInitStateSuccess(state: appState): appState {
      return { ...state, receivingInitState: false }
    }
  }
};

export default appModel;