const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMonitor = require('webpack-monitor')

const PRODUCTION = process.env.NODE_ENV === 'production'
const PUBLIC_PATH = '/'
const BASE_HTML_CONF = {
  publicUrl: PUBLIC_PATH,
  template: './public/index.html',
}

const pages = fs.readdirSync(path.join(__dirname, 'src/pages')).map(filename =>
  filename
    .replace(/\.js$/, '')
    .replace(/^Page/, '')
    .toLowerCase()
)

const htmlPages = () => {
  return pages.map(
    page =>
      new HtmlWebpackPlugin(
        Object.assign({}, BASE_HTML_CONF, { filename: `${page}/index.html` })
      )
  )
}

module.exports = {
  entry: [path.resolve(__dirname, 'src/index.js')],
  devtool: PRODUCTION ? 'source-map' : 'eval',
  devServer: {
    contentBase: [path.join(__dirname, '../dist'), path.join(__dirname, 'public')],
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages'),
      comps: path.resolve(__dirname, 'src/components'),
      src: path.resolve(__dirname, 'src'),
      '@kidsagree/ui': path.resolve(__dirname, '..'),
      'ui-src': path.resolve(__dirname, '../src'),
    },

    // Only needed because @kidsagree/ui is linked
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, '../node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [
            ["babel-plugin-styled-components", {
              "displayName": !PRODUCTION,
            }],
          ],
        },
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: (() => {
    let plugins = [
      // new CleanWebpackPlugin(['dist']),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
      }),
      new HtmlWebpackPlugin(BASE_HTML_CONF),
    ]

    if (PRODUCTION) {
      plugins = plugins
        .concat([
          new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
          }),
          new CompressionPlugin(),
          new WebpackMonitor({ launch: !!process.env.INSPECT_BUNDLE }),
        ])
        .concat(htmlPages())
    }
    return plugins
  })(),
  output: {
    publicPath: PUBLIC_PATH,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
