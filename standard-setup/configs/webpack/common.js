// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./index.tsx",
  resolve: {
    fallback: {
      fs: false,
      dns: false,
      net: false,
      tls: false,
      module: false,
    },
    extensions: [
      ".web.js",
      ".mjs",
      ".js",
      ".json",
      ".web.jsx",
      ".jsx",
      ".ts",
      ".tsx",
      ".html",
      ".htm",
    ],
  },
  context: resolve(__dirname, "../../src"),
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        exclude: [
          /\.(js|jsx|ts|tsx|mjs|ejs|scss)$/,
          /\.html?$/,
          /\.json$/,
          /\.css$/,
        ],
        parser: {
          dataUrlCondition: {
            maxSize: 15000,
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8].[ext]",
        },
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html.ejs" }),
    new webpack.EnvironmentPlugin({
      WEBPACK_BUILD_TIMESTAMP: Date.now(),
    }),
    new NodePolyfillPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
  stats: {
    warningsFilter: [/Failed to parse source map/],
  },
};
