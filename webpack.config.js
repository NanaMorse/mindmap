const webpack = require('webpack');
const path = require('path');
const yargs = require('yargs');
const fs = require('fs');

// 获取脚本参数 / get script parameter
const { env } = yargs.argv;
const isEnvDevelop = env === process.env.npm_package_config_dev_flag;
const isEnvProduction = env === process.env.npm_package_config_prod_flag;

if (isEnvProduction) {
  // 删除source-map数据 / remove source map data
  fs.unlink(path.join(__dirname, './public/dist/bundle.js.map'), (err) => {
    if (err) console.error(err)
  })
}

module.exports = {

  entry: './client/src/index.tsx',

  output: {
    path : path.join(__dirname, '/public/dist'),
    filename : 'bundle.js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: isEnvDevelop ? "source-map" : '',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],

    alias: {
      src: path.join(__dirname, '/client/src'),
      root: path.join(__dirname, '/')
    },
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(dva)\/).*/
      },

      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(s?)css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
        }, {
          loader: "sass-loader",
        }]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env),
        'is_dev': isEnvDevelop,
        'is_prod': isEnvProduction
      }
    })
  ],

  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "redux": "Redux"
  }
};