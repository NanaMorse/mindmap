import * as React from 'react'
import { connect } from 'dva'
import SheetEditPanel from './SheetEditPanel';
import TopicEditPanel from './TopicEditPanel';
import './edit-panel-style.scss'

interface OperatorPanelsProps {
  /**
   * @description 当前被选中的topic的id列表 ／ current selected topic's id list
   * */
  selectionList: Array<string>
}

interface OperatorPanelsState {
  /**
   * @description 是否展示面板
   * */
  showPanel: boolean
}

class OperatorPanels extends React.PureComponent<OperatorPanelsProps, OperatorPanelsState> {

  constructor() {
    super();

    // todo 添加侧边栏显示切换
    this.state = {
      showPanel: true
    }
  }

  render() {
    const selectionLen = this.props.selectionList.length;

    if (!selectionLen) return <SheetEditPanel />;

    return <TopicEditPanel />;
  }
}

const mapStateToProps = ({ map }) => {
  return { selectionList: map.selectionList };
};

export default connect(mapStateToProps)(OperatorPanels);