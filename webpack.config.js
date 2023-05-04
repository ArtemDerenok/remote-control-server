const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.ts",
  target: "node",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      http: require.resolve("stream-http"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  plugins: [new NodemonPlugin(), new ESLintPlugin({ extensions: ["ts"] })],
};
