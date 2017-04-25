/**
 * @fileOverview 设置组件的各种距离
 * */

import { TopicType, TopicShapeType, LayoutType } from './common';

const { RECT, ROUNDED_RECT, PARALLELOGRAM } = TopicShapeType;

/**
 * @description Topic内补的倍率
 * */
export const TopicPaddingOverride = {
  [TopicType.ROOT]: {
    [RECT]: {
      paddingTop: 2 / 3,
      paddingLeft: 4 / 5
    },
    [ROUNDED_RECT]: {
      paddingTop: 2 / 3,
      paddingLeft: 4 / 5
    },
    [PARALLELOGRAM]: {
      paddingTop: 2 / 3,
      paddingLeft: 8 / 5
    }
  },

  [TopicType.MAIN]: {
    [RECT]: {
      paddingTop: 2 / 5,
      paddingLeft: 2 / 3
    },
    [ROUNDED_RECT]: {
      paddingTop: 2 / 5,
      paddingLeft: 2 / 3
    },
    [PARALLELOGRAM]: {
      paddingTop: 2 / 5,
      paddingLeft: 4 / 3
    }
  },

  [TopicType.SUB]: {
    [RECT]: {
      paddingTop: 1 / 2,
      paddingLeft: 2 / 3
    },
    [ROUNDED_RECT]: {
      paddingTop: 1 / 2,
      paddingLeft: 2 / 3
    },
    [PARALLELOGRAM]: {
      paddingTop: 1 / 2,
      paddingLeft: 4 / 3
    }
  }
};

/**
 * @description Topic之间的外间距，与布局模式相关
 * */
export const TopicMargin = {
  [LayoutType.LOGIC_TO_RIGHT] : {
    marginTop: 10,
    marginLeft: 20
  }
};