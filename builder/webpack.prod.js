const path = require('path');

const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin2 = require('html-webpack-plugin');
// const {I18nPlugin} = require('@lingui/webpack-plugin');
const env = require('dotenv').config({ path: path.resolve(__dirname, '..', './.env') }).parsed;
module.exports = {
  mode: 'production',
  output: {
    publicPath: env.PUBLIC_PATH,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'web builder',
      template: paths.template,
      favicon: paths.favicon,
      version: 'version1.0.0',
      filename: paths.filename,
      inject: 'body',
      scriptLoading: 'defer',
      basename: process.env.REACT_APP_USE_BASENAME,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'resources/static/css/[name].[contenthash:8].css',
      chunkFilename: 'resources/static/css/[name].[contenthash:8].chunk.css',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: './src/serviceWorker.js',
    //   swDest: 'serviceWorker.js',
    // }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '..', './public/locales'),
          to: path.join(__dirname, '..', './dist/locales'), // copy public folder, which contains locales for i18next
        },
        {
          from: path.join(__dirname, '..', './public/lib'),
          to: path.join(__dirname, '..', './dist/lib'), // copy public folder, which contains lib for lib
        },
        {
          from: path.join(__dirname, '..', './public/web.config'),
          to: path.join(__dirname, '..', './dist/web.config'), // copy public folder, which contains locales for i18next
        },
        {
          from: path.join(__dirname, '..', './public/oidc-client.min.js'),
          to: path.join(__dirname, '..', './dist/oidc-client.min.js'), // copy public folder, which contains locales for i18next
        },
        {
          from: path.join(__dirname, '..', './public/cookie.js'),
          to: path.join(__dirname, '..', './dist/cookie.js'), // copy cookie file
        },
        {
          from: path.join(__dirname, '..', './public/silent-renew.html'),
          to: path.join(__dirname, '..', './dist/silent-renew.html'), // copy public folder, which contains locales for i18next
        },
        {
          from: path.join(__dirname, '..', './public/signin-callback.html'),
          to: path.join(__dirname, '..', './dist/signin-callback.html'), // copy public folder, which contains locales for i18next
        },
      ],
    }),
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(env) }),
  ],
  devtool: 'inline-source-map',

  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        // minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
            unused: true,
            drop_console: false,
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
      // testing build

      minSize: 30000, // Minimum size in bytes for a chunk to be generate
      minChunks: 1, // Minimum number of chunks that must share a module before splitting

      maxAsyncRequests: 20, // Maximum number of parallel requests when loading async chunks
      maxInitialRequests: 30, // Maximum number of parallel requests at an entry point
      automaticNameDelimiter: '~', // Delimiter for automatic chunk name
      //--------------
      cacheGroups: {
        ckeditor: {
          test: /[\\/]node_modules[\\/](@ckeditor)[\\/]/,
          name: 'ckeditor',
          chunks: 'all',
          priority: -10,
          reuseExistingChunk: true,
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'antd',
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
        },
        apexcharts: {
          test: /[\\/]node_modules[\\/]apexcharts[\\/]/,
          name: 'apexcharts',
          chunks: 'all',
          priority: -30,
          reuseExistingChunk: true,
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -40,
          reuseExistingChunk: true,
        },

        // defaultVendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10,
        //   reuseExistingChunk: true,
        // },
        default: {
          minChunks: 2,
          priority: -50,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  devtool: 'source-map',
};

/**
 * 
 splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },



     splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      name: false,
      // name: (module, chunks, cacheGroupKey) => {
      //   const allChunksNames = chunks.map(chunk => chunk.name).join('-');
      //   return allChunksNames;
      // },
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'vendor-react',
          chunks: 'all',
        },
        corejsVendor: {
          test: /[\\/]node_modules[\\/](core-js)[\\/]/,
          name: 'vendor-corejs',
          chunks: 'all',
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace('@', '')}`;
          },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single',
 */
