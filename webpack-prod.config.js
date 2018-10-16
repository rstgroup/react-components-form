const path = require('path');
const autoprefixer = require('autoprefixer');
const { dependencies } = require('./package.json');

const libraryTarget = 'umd';

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.js',
        Bootstrap: './src/components/styled/Bootstrap.js',
        Separate: './src/components/separate/index.js',
        AutocompleteField: './src/components/AutocompleteField.jsx',
        FormController: './src/components/FormController.js',
    },
    output: {
        path: path.join(__dirname, ''),
        filename: '[name].js',
        libraryTarget,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: [
        (context, request, callback) => {
            if (dependencies[request]) {
                callback(null, `${libraryTarget} ${request}`);
                return;
            }
            callback();
        },
    ],
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
    },
};
