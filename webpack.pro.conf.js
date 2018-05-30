const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    entry: {
        main: path.join(__dirname, './src/client/index.jsx'),
    },
    output: {
        path: path.join(__dirname, './dist'), // 打包目标地
        filename: 'script/[name].[hash].js',
        publicPath: '/', //pro
        chunkFilename: "script/[name].[chunkHash:8].chunk.js", // chunk业务包，第三方包，不是hash，必须是chunkHash，才长效缓存
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
                include: path.join(__dirname, './src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', "stage-3"]
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
                test: /\.(css|less)$/,
                include: path.join(__dirname, './src/client'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: true,
                                localIdentName: '[name]_[local]__[hash:base64:5]',
                                importLoaders: 2,
                                sourceMap: false,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require("autoprefixer")({ browsers: ["last 2 versions"] })
                                ]
                            },
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                }),
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
        new ExtractTextPlugin({
            // filename: "css/[contenthash:8].min.css",
            filename: "css/[name]-[contenthash:8].min.css",
            allChunks: true
        }),
        new UglifyJSPlugin({
            sourceMap: false,
        }),
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
}