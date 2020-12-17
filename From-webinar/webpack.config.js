const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
    }),
  ];

  return {
    mode: argv.mode,
    devtool: "eval-source-map",

    entry: {
      index: ["./src/index.js"],
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "js/bundle.js",
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    plugins,

    devServer: {
      contentBase: path.join(__dirname, "src"),
      compress: true,
      port: 8080,
      overlay: true,
      inline: true,
      clientLogLevel: "silent",
      stats: {
        modules: false,
      },
      proxy: {
        "/api/**": {
          target: "http://localhost:3000",
          secure: false,
        },
      },
    },
  };
};
