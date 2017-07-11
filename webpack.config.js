var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', "./src/demo/index.jsx"],
    output: {
        path: '/dist/',
        filename: "demo.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'es2017', 'react']
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 9002
    }
};