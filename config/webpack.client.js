const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pluginConfig = require("../pluginrc");
const buildFolder = path.join(
  pluginConfig.destinationFolder,
  pluginConfig.extensionBundleId
);
const client_output = path.resolve(buildFolder, "client");
const client_entry = path.resolve(__dirname, "../client/index.tsx");
const html_template = path.join(
  __dirname,
  "./assets/templates/index.template.html"
);

module.exports = {
  entry: client_entry,
  target: "web",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    ignoreBrowserslistConfig: true,
                  },
                ],
                "@babel/preset-react",
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
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts", ".scss"],
  },
  output: {
    path: client_output,
    publicPath: "",
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: client_output,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: html_template,
      filename: "index.html",
      inject: "body",
      title: "HTML Webpack Plugin",
      bar: "bar",
    }),
  ],
};
