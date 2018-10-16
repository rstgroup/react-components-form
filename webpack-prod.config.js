const path = require('path');
const autoprefixer = require('autoprefixer');

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
        libraryTarget: 'umd',
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
    },
};
