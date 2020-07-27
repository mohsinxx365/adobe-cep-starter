const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const pluginConfig = require("../pluginrc.js");
const buildFolder = path.join(
  pluginConfig.destinationFolder,
  pluginConfig.extensionBundleId
);
const server_output = path.join(buildFolder, "server");
const server_entry = path.join(pluginConfig.root, "server/");
const server_file = path.join(server_entry, "index.ts");

module.exports = {
  entry: server_file,
  target: "node",
  externals: [
    nodeExternals({ modulesDir: path.join(server_entry, "node_modules") }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", { targets: { node: "6" } }],
            "@babel/preset-typescript",
          ],
          plugins: [
            [
              "@babel/plugin-proposal-decorators",
              {
                legacy: true,
              },
            ],
            "@babel/plugin-transform-object-assign",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-class-properties",
            "babel-plugin-styled-components",
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", "tsx"],
  },
  node: {
    global: true,
    __filename: true,
    __dirname: false,
  },
  output: {
    pathinfo: false,
    path: server_output,
    publicPath: "",
    filename: "bundle.js",
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(server_entry, "node_modules"),
          to: "../node_modules",
        },
      ],
    }),
  ],
};
