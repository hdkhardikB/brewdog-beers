const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            Components: path.resolve(__dirname, '../src/components'),
            Static: path.resolve(__dirname, '../static'),
            Config: process.argv.indexOf('production') > 0 ? path.resolve(__dirname, '../src/config/prod') : path.resolve(__dirname, '../src/config/dev'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }, {
                test: /\.(svg|png|gif|jpg)$/,
                use: 'file-loader',
            }, {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                    },
                },
            }],
    },
    plugins: [
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
}
