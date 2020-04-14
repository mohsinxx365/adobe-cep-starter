const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pluginConfig = require('../pluginrc');
const buildFolder = path.join(pluginConfig.destinationFolder, pluginConfig.extensionBundleId)
const clientOutput = path.resolve(buildFolder, 'client');
const clientEntry = path.resolve(__dirname, '../client/index.tsx');
const htmlTemplate = path.join(__dirname, 'templates/index.template.html')


module.exports({
    entry: clientEntry,
    target: 'web',
    module: {
        rules: [
            {

            }
        ]
    }
})