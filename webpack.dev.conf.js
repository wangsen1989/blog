const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        main: path.join(__dirname, './src/client/index.jsx'),
    },
    output: {
        path: path.join(__dirname, './dist'), // 打包目标地
        filename: 'script/[name].[hash].js',
        chunkFilename: "script/[name].[chunkHash:8].js", // chunk业务包，第三方包，不是hash，必须是chunkHash，才长效缓存
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, './src/client'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3'],
                    plugins: [
                        "transform-runtime",
                        "react-hot-loader/babel",
                        ["import", { libraryName: "antd-mobile", style: "css" }],
                        "transform-decorators-legacy",
                        "transform-class-properties",
                    ],
                }
            },
            {
                test: /\.css|less$/,
                include: path.join(__dirname, './node_modules'),
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.css|less$/,
                include: path.join(__dirname, './src/client'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[name]_[local]__[hash:base64:5]',
                            importLoaders: 2,
                            sourceMap: true,
                        }
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                include: path.join(__dirname, './src/client'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'images/[name].[ext]',
                    }
                }],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        }),
        new Webpack.HotModuleReplacementPlugin(),//热更新必须，维护状态@1
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
        },
        runtimeChunk: {
            name: "manifest",
        },
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        inline: true,
        port: 8888,
        // host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://127.0.0.1:9999",
                changeOrigin: true,
                // pathRewrite: { "^/api": "" }
            },
            "/imageserver": {
                target: "http://127.0.0.1:9999",
                changeOrigin: true,
                // pathRewrite: { "^/api": "" }
            }
            // "/": "http://127.0.0.1:9999"
        },
        overlay: {
            warnings: true,
            errors: true
        },
        compress: true,
        hot: true,//热更新必须，维护状态@2， /这个是使用热更新的标志，然后并不提供热更新功能，需要引入hotModule
        hotOnly: true        //启用热模块替换而, 不刷新页面作为回退。
    },
    devtool: "source-map",
}