export default {
  "sheet" : {
    "bgColor" : "#fff"
  },

  "topics" : {
    "defaultStyle" : {
      "fontSize" : "16px",
      "shapeClass" : "rect",
      "fillColor" : "rgb(203, 222, 253)"
    },
    "feed" : ["0", "1", "2"],
    "topicById" : {
      "0" : {
        "id" : "0",
        "parentId" : null,
        "structureClass" : "logictoright",
        "text" : "Central Topic",
        "style" : {
          "fontSize" : "20px"
        }
      },
      "1" : {
        "id" : "1",
        "parentId" : "0",
        "structureClass" : "logictoright",
        "text" : "Child 1"
      },
      "2" : {
        "id" : "2",
        "parentId" : "0",
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 2"
      }
    }
  }
};

export const testData = {
  "sheet" : {
    "bgColor" : "#fff"
  },

  "topics" : {
    "defaultStyle" : {
      "fontSize" : "16px",
      "shapeClass" : "rect",
      "fillColor" : "rgb(203, 222, 253)"
    },
    "feed" : ["0", "1", "2", "3", "4", "5"],
    "topicById" : {
      "0" : {
        "id" : "0",
        "parentId" : null,
        "structureClass" : "logictoright",
        "text" : "Central Topic",
        "style" : {
          "fontSize" : "20px"
        }
      },
      "1" : {
        "id" : "1",
        "parentId" : "0",
        "structureClass" : "logictoright",
        "text" : "Child 1"
      },
      "2" : {
        "id" : "2",
        "parentId" : "0",
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 2"
      },
      "3" : {
        "id" : "3",
        "parentId" : "2",
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 3"
      },
      "4" : {
        "id" : "4",
        "parentId" : "1",
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 4"
      },
      "5" : {
        "id" : "5",
        "parentId" : "1",
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 5"
      }
    }
  }
};