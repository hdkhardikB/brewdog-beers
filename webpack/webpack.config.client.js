const path = require('path');
const shared = require('./webpack.config.shared')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    ...shared,
    entry: {
        browser: ['@babel/polyfill', path.resolve(__dirname, '../src/index.jsx')],
    },
    module: {
        ...shared.module,
        rules: [
            ...shared.module.rules,
            {
                test: /\.scss$/,
                use: [
                    process.argv.indexOf('production') > 0 ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader?importLoaders=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        ...shared.plugins,
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
}

