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
    "feed" : {
      "id" : "0",
      "children" : [
        {
          "id" : "1",
          "children" : [
            {
              "id" : "4"
            },
            {
              "id" : "5"
            }
          ]
        },
        {
          "id" : "2",
          "children" : [
            {
              "id" : "3"
            }
          ]
        }
      ]
    },
    "topicById" : {
      "0" : {
        "structureClass" : "logictoright",
        "text" : "Central Topic",
        "style" : {
          "fontSize" : "20px"
        }
      },
      "1" : {
        "structureClass" : "logictoright",
        "text" : "Child 1"
      },
      "2" : {
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 2"
      },
      "3" : {
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 3"
      },
      "4" : {
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 4"
      },
      "5" : {
        "structureClass" : "logictoright",
        "text" : "I'm Child Topic 5"
      }
    }
  }
};