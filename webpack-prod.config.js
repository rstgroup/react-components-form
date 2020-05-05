const path = require('path');
const pkg = require('./package.json');

const externals = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
]);

const config = {
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
    externals(context, request, callback) {
        if (externals.has(request)) {
            return callback(null, `${config.output.libraryTarget} ${request}`);
        }
        return callback();
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
    },
};

module.exports = config;
