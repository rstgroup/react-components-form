var webpack = require('webpack');

module.exports = {
    entry: ['@babel/polyfill', "./src/demo/index.jsx"],
    output: {
        path: '/dist/',
        filename: "demo.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[hash:base64:5]'
                            }
                        }
                    }
                ],
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 9002
    }
};