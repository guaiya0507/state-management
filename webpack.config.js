const path = require('path')
const fs = require('fs')

const root = __dirname
const src = path.resolve(root, 'src')


const alias = (function (src) {
  const moduleAlias = {
    '@root': src,
  }

  return fs
    .readdirSync(path.resolve(src))
    .filter(function (dir) {
      try {
        return fs.statSync(path.resolve(src, dir)).isDirectory()
      } catch (e) {
        return false
      }
    })
    .reduce(function (moduleAlias, dir) {
       moduleAlias['@' + dir] = path.resolve(src, dir)
       return moduleAlias
    }, moduleAlias)
})(src)

module.exports = {
  entry: {
    flux: './src/flux/main.js',
    //redux: './src/redux/main.js',
    mobx: './src/mobx/main.js',
    //rtjs: './src/rtjs/main.js',
  },
  output: {
    filename: '[name].js',
    path: './webroot',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['latest', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy'],
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
        ]
      },
    ],
  },
  resolve: {
    alias: alias,
  },
}
