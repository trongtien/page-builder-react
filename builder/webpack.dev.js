const path = require('path');
const webpack = require('webpack');
// const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const env = require('dotenv').config({path: path.resolve(__dirname, '..', './.env.development')}).parsed;
const paths = require('./paths');

const Config = require('../config.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({'process.env': JSON.stringify(env)}),
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Web builder',
      template: paths.template,
      favicon: paths.favicon,
      version: 'version1.0.0',
      filename: paths.filename,
      inject: 'body',
      basename: process.env.REACT_APP_USE_BASENAME,
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    compress: true,
    port: Config.port,
    open: true,
    hot: true,

    client: {
      logging: 'info',
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },

    historyApiFallback: true,
    allowedHosts: 'all',
    devMiddleware: {
      publicPath: '/',
      mimeTypes: {},
    },
    // before(app, server) {
    //   console.log('REACT_APP_LCM_REPORT_URL_API:', process.env.REACT_APP_LCM_REPORT_URL_API);
    // },
  },

  devtool: 'cheap-module-source-map',
};
