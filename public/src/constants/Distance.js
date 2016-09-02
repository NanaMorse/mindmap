import * as CommonConstant from '../constants/Common';

export const TopicPaddingOverride = {
  [CommonConstant.TOPIC_ROOT]: {
    [CommonConstant.SHAPE_RECT]: {
      paddingTop: 2 / 3,
      paddingLeft: 4 / 5
    },
    [CommonConstant.SHAPE_ROUNDED_RECT]: {
      paddingTop: 2 / 3,
      paddingLeft: 4 / 5
    },
    [CommonConstant.SHAPE_PARALLELOGRAM]: {
      paddingTop: 2 / 3,
      paddingLeft: 8 / 5
    }
  },

  [CommonConstant.TOPIC_MAIN]: {
    [CommonConstant.SHAPE_RECT]: {
      paddingTop: 2 / 5,
      paddingLeft: 2 / 3
    },
    [CommonConstant.SHAPE_ROUNDED_RECT]: {
      paddingTop: 2 / 5,
      paddingLeft: 2 / 3
    },
    [CommonConstant.SHAPE_PARALLELOGRAM]: {
      paddingTop: 2 / 5,
      paddingLeft: 4 / 3
    }
  },

  [CommonConstant.TOPIC_SUB]: {
    [CommonConstant.SHAPE_RECT]: {
      paddingTop: 1 / 2,
      paddingLeft: 2 / 3
    },
    [CommonConstant.SHAPE_ROUNDED_RECT]: {
      paddingTop: 1 / 2,
      paddingLeft: 2 / 3
    },
    [CommonConstant.SHAPE_PARALLELOGRAM]: {
      paddingTop: 1 / 2,
      paddingLeft: 4 / 3
    }
  }
};

export const TopicMargin = {
  [CommonConstant.LOGIC_TO_RIGHT] : {
    marginTop: 10,
    marginLeft: 20
  }
};

export const LabelPadding = {
  paddingTop: 5,
  paddingRight: 5,
  paddingBottom: 5,
  paddingLeft: 5
};