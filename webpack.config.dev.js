// Node programming and modules since we're working in Node (CommonJS)
// We use ES modules when doing React
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; // important for Babel plugin

// Used by Webpack
module.exports = {
  mode: "development",
  target: "web",
  // source maps let us see our original code when debugging in browser
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    // Webpack won't write a file to build in development mode
    // Instead of outputting code, it servers our app from memory from this directory:
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    stats: "minimal", // reduces stats written to command line
    overlay: true, // overlay errors in browser
    historyApiFallback: true // All requests sent to index.html - deep links handled by React router
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // Webpack will watch files, run ESLint and then recompile JS/JSX files through Babel and before bundling up
        // Note rules are run from the bottom up (ESLint first, then Babel)
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
