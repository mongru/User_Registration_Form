const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
                // use: ['style-loader', 'css-loader', "postcss-loader"]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', "postcss-loader", 'sass-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            }
        ]
    },
    plugins: [
        require('autoprefixer'),
        new webpack.SourceMapDevToolPlugin({
            filename: 'bundle.js.map',
            exclude: ['/node_modules/', 'vendor.js']
        }),
        new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
        new ExtractTextPlugin("styles.css")
    ]
};
