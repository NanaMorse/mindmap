export default {
  "sheet" : {
    "bgColor" : "#fff"
  },

  "topics" : {
    "style" : {
      "fontSize" : "16px",
      "shapeClass" : "rect",
      "fillColor" : "rgb(203, 222, 253)"
    },
    "feed" : ["0", "1", "2"],
    "topicById" : {
      "0" : {
        "parentId" : null,
        "text" : "Central Topic"
      },
      "1" : {
        "parentId" : "0",
        "text" : "Child Topic 1"
      },
      "2" : {
        "parentId" : "0",
        "text" : "Child Topic 2"
      }
    }
  }
};