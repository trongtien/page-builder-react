const path = require('path');
const paths = require('./paths');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const {styles} = require('@ckeditor/ckeditor5-dev-utils');
module.exports = {
  entry: {
    main: './src/index.js',
  },
  cache: true,
  output: {
    path: paths.outputBuilder,
    filename: 'resources/js/[name].[contenthash:8].js',
    chunkFilename: 'resources/js/[name].bundle.js',
    clean: true,
    // publicPath: paths.publicUrlOrPath,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'resources/static/images',
              exclude: [
                /\.(js|mjs|jsx|ts|tsx)$/,
                /\.html$/,
                /\.json$/,
                /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
              ],
              // publicPath: '/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              name: '[name].[ext]',
              outputPath: 'resources/static/images',
              jsx: 'react',
              icon: false,
              limit: 8192,
              // publicPath: '/',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
    alias: {
      '@config': paths.configJson,
      '@package': paths.packageJson,
      '@languages': paths.languages,
      App: paths.appPath,
    },
  },
  plugins: [],
};
