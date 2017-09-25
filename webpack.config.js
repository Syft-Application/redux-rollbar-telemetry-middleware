const webpack = require('webpack')
const path = require('path')
const _ = require('lodash')
const packageJson = require('./package.json')

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

const fileName = packageJson.name
const libraryName = _.camelCase(fileName)

const plugins = []
let outputFile

if (process.env.NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin({
    compressor: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      warnings: false,
    },
  }))
  outputFile = `${fileName}.min.js`
}
 else {
  outputFile = `${fileName}.js`
}

const config = {
  externals: [
    'lodash'
  ],
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.js'],
  },
  plugins,
}

module.exports = config
