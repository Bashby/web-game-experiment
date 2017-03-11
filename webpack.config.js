// Load external libs
var path = require('path');
var webpack = require("webpack");
var WebpackChunkHash = require("webpack-chunk-hash"); // override hashing of chunks using md5
var HtmlWebpackPlugin = require('html-webpack-plugin'); // generate the html using webpack and templates
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin'); // 2nd attempt at inlining the manifest
var FaviconsWebpackPlugin = require('favicons-webpack-plugin'); // generate favicons for multiple devices
var CleanWebpackPlugin = require('clean-webpack-plugin'); // empty build dirs on re-build

// Parse environment
var development = process.env.NODE_ENV !== "production";
var clean = process.env.BUILD_CLEAN == "true";

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    vendor: ["lodash", "pixi.js", "./vendor.js"],
    app: "./app.js"
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: development ? "[name].js" : "[name].[chunkhash].js",
    chunkFilename: development ? "[name].js" : '[name].[chunkhash].js',
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.json$/,
  //       include: path.resolve(__dirname, 'node_modules/pixi.js'), // Note: Restricts the JSON loader to only PIXI
  //       use: [
  //         {
  //           loader: 'json-loader',
  //         },
  //       ]
  //     }
  //   ]
  // },
  // postLoaders: [
  //   {
  //     include: path.resolve(__dirname, 'node_modules/pixi.js'), // Note: Use the browserify transform loader for PIXI
  //     loader: 'transform?brfs'
  //   }
  // ]
  plugins: [
    // Clean up existing
    clean ? new CleanWebpackPlugin(['dist', 'build']) : function(){},

    // Production optimizations
    development ? function(){} : new webpack.optimize.OccurrenceOrderPlugin(),
    development ? function(){} : new webpack.optimize.UglifyJsPlugin(),

    // Break out vendor and manifest common chunks
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),

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
