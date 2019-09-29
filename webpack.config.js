const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
    // print: './src/print.js'
    //another: './src/another-module.js',
    //contact: './src/contact/contact.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '加班计算器',
      template: 'src/index.html'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'contact.html',
    //   title: '联系我们',
    //   template: 'src/contact/contact.html'
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [{
        test: require.resolve('jquery'), //require.resolve 用来获取模块的绝对路径
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: [
      //     'file-loader'
      //   ]
      // },
      // {
      //   test: /\.(csv|tsv)$/,
      //   use: [
      //     'csv-loader'
      //   ]
      // },
      // {
      //   test: /\.xml$/,
      //   use: [
      //     'xml-loader'
      //   ]
      // }
    ]
  }
};