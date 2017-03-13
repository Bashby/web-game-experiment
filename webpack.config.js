// Load external libs
var path = require('path');
var webpack = require("webpack");
var WebpackChunkHash = require("webpack-chunk-hash"); // override hashing of chunks using md5
var HtmlWebpackPlugin = require('html-webpack-plugin'); // generate the html using webpack and templates
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin'); // 2nd attempt at inlining the manifest
var FaviconsWebpackPlugin = require('favicons-webpack-plugin'); // generate favicons for multiple devices
var CleanWebpackPlugin = require('clean-webpack-plugin'); // empty build dirs on re-build
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // handling CSS files

// Parse environment
var development = process.env.NODE_ENV !== "production";
var clean = process.env.BUILD_CLEAN == "true";

// Babel transpiler options
var babelOptions = {
  'cacheDirectory': true,
  "presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "es2016"
  ]
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    vendor: ["lodash", "pixi.js", "./vendor.ts"],
    app: "./app.ts"
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: development ? "[name].js" : "[name].[chunkhash].js",
    chunkFilename: development ? "[name].js" : '[name].[chunkhash].js',
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i, // Notes: Embed small images in CSS via data-urls
        loaders: [
          {
            "loader": 'url-loader',
            query: {
              limit: 10000
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.json', '.css', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'eot', 'ttf', 'woff', 'woff2']
  },
  plugins: [
    // Clean up existing
    clean ? new CleanWebpackPlugin(['dist', 'build']) : function () { },

    // Production optimizations
    development ? function () { } : new webpack.optimize.OccurrenceOrderPlugin(),
    development ? function () { } : new webpack.optimize.UglifyJsPlugin(),

    // Break out vendor and manifest common chunks
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new ExtractTextPlugin("[name].css"),

    // Build Index.html
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      inlineManifestWebpackName: 'webpackManifest',
      title: 'WebRTC Experiment',
      mobile: true,
      meta: [
        {
          name: 'description',
          content: 'An experiment with the WebRTC protocol.'
        }
      ],
      minify: {
        'collapseWhitespace': development ? false : true,
        'preserveLineBreaks': true,
      },
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, './src/img/favicon.png'),
      prefix: 'favicons-[hash]/',
      title: 'app-favicon',
      persistentCache: true,
      emitStats: false,
      inject: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),

    // Hash chunks
    development ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
  ]
};
