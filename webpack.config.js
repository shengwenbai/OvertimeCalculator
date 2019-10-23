/* eslint-disable linebreak-style */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js',
    // print: './src/print.js'
    // another: './src/another-module.js',
    // contact: './src/contact/contact.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: '加班计算器',
      template: 'src/index.html',
      favicon: './favicon.ico',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      title: '登录',
      template: 'src/login.html',
      favicon: './favicon.ico',
      chunks: ['login'],
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'contact.html',
    //   title: '联系我们',
    //   template: 'src/contact/contact.html'
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn'],
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  module: {
    rules: [{
      test: require.resolve('jquery'), // require.resolve 用来获取模块的绝对路径
      use: [{
        loader: 'expose-loader',
        options: 'jQuery',
      },
      {
        loader: 'expose-loader',
        options: '$',
      },
      ],
    },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it uses publicPath in webpackOptions.output
          publicPath: '../',
          hmr: process.env.NODE_ENV === 'development',
        },
      },
      // 'style-loader',
      'css-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif|eot|ttf|woff)$/,
      loader: 'url-loader',
      options: {
        publicPath: './',
        limit: 10000,
        name: 'img/[name].[hash:8].[ext]',
      },
    },
    {
      test: /\.html$/,
      loader: 'html-withimg-loader',
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
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
    ],
  },
};
