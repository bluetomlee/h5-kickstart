
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const dependencies = Object.keys(require('./package.json').dependencies);
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const config = {
    entry: './src/app.js',
	path: 'dist',
    publicPath: 'dist',
    port: '8080'
};

module.exports = {
    // 页面入口文件配置
    entry: {
        common: dependencies,
        index: config.entry
    },
    // 入口文件输出配置
    output: {
        path: path.join(__dirname, config.path),
        filename: '[name].js', // filename和html里面的文件要对应
        publicPath: config.publicPath
    },
    plugins: [
        /**
         * [NoErrorsPlugin description]插件错误时重启
         */
        new webpack.NoErrorsPlugin(),

        new webpack.ProvidePlugin({
          riot: 'riot'
        }),
        // copy
        new TransferWebpackPlugin([
            {
                from: 'assets',
                to: 'assets'
            }
        ], path.resolve(__dirname, "src")),
        /**
         * [HtmlwebpackPlugin description]指定模板
         * template 指定模板
         */
        new HtmlwebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js'
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${config.port}/${config.path}`
        })
    ],

    /**
     * 配置文件后缀名
     */
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
    },
    node: {
      fs: "empty"
    },
    module: {
        preLoaders: [
           {
               test: /\.tag$/,
               exclude: /node_modules/,
               loader: 'riotjs-loader',
               query: { type: 'none' }
           }
         ],
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader?importLoaders=1"
        },
        {
            test: /\.less?$/,
            loader : 'style!css!less',
        },{
            test: /\.js$|\.tag$/,
            loader: 'babel-loader',
            query: {
                presets: ["es2015"]
            },
            exclude: /node_modules/
        },{
            test: /\.(jpg|png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=990&name=/assets/[hash:8].[name].[ext]',
        },]
    }
};
