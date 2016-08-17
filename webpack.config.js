var debug = process.env.NODE_ENV !=='production';
var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./js/shop.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties'],
                },

            },
            {
                test: /\.less/,
                loader: 'style!css!less'
            },
            {
                test: /\.css/, loader:
                'style!css' },
            {
                test: /\.(woff2|woff|ttf|svg|eot)$/,
                loader: 'file-loader'
            }
        ]
    },
    output: {
        path: __dirname + '/src/',
        filename: "shop.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
        new ExtractTextPlugin("[name].css")
    ]
}