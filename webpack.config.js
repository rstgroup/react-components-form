const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: [
        '@babel/polyfill',
        './src/demo/index.jsx',
    ],
    output: {
        path: '/dist/',
        filename: 'demo.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
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
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()],
                        },
                    },
                ],
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        port: 9002,
    },
};
