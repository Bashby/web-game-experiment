// Load external libs
var path = require('path');
var webpack = require("webpack");
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin"); // extracts manifest to its own file
var WebpackChunkHash = require("webpack-chunk-hash"); // override hashing of chunks using md5
var HtmlWebpackPlugin = require('html-webpack-plugin'); // generate the html using webpack and templates
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'); // inlining and hinting for scripts
var FaviconsWebpackPlugin = require('favicons-webpack-plugin'); // generate favicons for multiple devices
var CleanWebpackPlugin = require('clean-webpack-plugin'); // empty build dirs on re-build

// Parse environment
var development = process.env.NODE_ENV !== "production";
var clean = process.env.BUILD_CLEAN == "true";

module.exports = {
  entry: {
    vendor: "./src/vendor.js",
    main: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: development ? "[name].js" : "[name].[chunkhash].js",
    chunkFilename: development ? "[name].js" : '[name].[chunkhash].js',
  },
  plugins: [
    clean ? new CleanWebpackPlugin(['dist', 'build']) : function(){},
    development ? function(){} : new webpack.optimize.OccurrenceOrderPlugin(),
    development ? function(){} : new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"], // vendor libs + extracted manifest
      minChunks: Infinity,
    }),
    development ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: "inline-manifest.js",
      manifestVariable: "applicationManifest"
    }),
    new HtmlWebpackPlugin({
      title: "WebRTC Experiment"
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: ['inline-manifest.js'],
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
    })
  ]
};
