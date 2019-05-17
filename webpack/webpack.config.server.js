const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const shared = require('./webpack.config.shared')

module.exports = {
    ...shared,
    entry: {
        server: ['@babel/polyfill', path.resolve(__dirname, '../server.jsx')],
    },
    module: {
        ...shared.module,
        rules: [
            ...shared.module.rules,
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
                    'sass-loader',
                ],
            },
        ],
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
        ...shared.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
}
