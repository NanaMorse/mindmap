
module.exports = {
  'entry' : './public/src/index.js',
  
  'output' : {
    path : './public/dist',
    filename : 'bundle.js'
  },

  'module' : {
    loaders : [{
      test : /\.js$/,
      loader : 'babel-loader'
    }]
  },

  'devtool' : "source-map"
};