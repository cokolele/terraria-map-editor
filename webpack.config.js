const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const NoModulePlugin = require('webpack-nomodule-plugin').WebpackNoModulePlugin;

module.exports = [
    //dev
    {
        name: "dev",
        context: path.resolve(__dirname, "./"),
        entry: [
            "webpack-dev-server/client?http://localhost:80",
            "webpack/hot/only-dev-server",
            "./src/index.jsx"
        ],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "./app.[name].js",
            assetModuleFilename: "asset[ext]"
        },
        resolve: {
            alias: {
                src: path.resolve(__dirname, "./src"),
            }
        },
        mode: "development",
        target: "browserslist:last 2 versions",
        optimization: {
            runtimeChunk: "single"
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "app.[name].css"
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false
            }),
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin()
        ],
        devtool: "eval-cheap-source-map",
        devServer: {
            hot: true,
            contentBase: "./src/",
            compress: true,
            port: 80,
            host: "0.0.0.0",
            proxy: {
                "/api": "http://localhost:3000",
                "/auth": "http://localhost:3000",
            },
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.png/,
                    type: "asset/resource"
                },
                {
                    test: /\.(js|mjs|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-react", {
                                    development: true,
                                    runtime: "automatic"
                                }]
                            ],
                            plugins: [
                                "react-refresh/babel"
                            ]
                        }
                    }
                }
            ]
        }
    },/*
    //polyfill
    {
        name: "polyfills",
        entry: "./src/polyfills.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "./app.polyfills.[contenthash:8].js",
            clean: true,
        },
        mode: "production",
        target: "browserslist"
    },
    //prod
    {
        name: "prod",
        context: path.resolve(__dirname, "./"),
        entry: "./src/index.jsx",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "./app.[name].[contenthash:8].js",
            assetModuleFilename: "asset.[contenthash:8][ext]",
            clean: true
        },
        resolve: {
            alias: {
                src: path.resolve(__dirname, "./src"),
            }
        },
        mode: "production",
        target: "browserslist",
        optimization: {
            runtimeChunk: "single"
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "app.[contenthash:8].css"
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false,
                inject: "body"
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"],
                },
                {
                    test: /\.png/,
                    type: "asset/resource"
                },
                {
                    test: /\.(js|mjs|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-react", {
                                    development: false,
                                    runtime: "automatic"
                                }],
                                ["@babel/preset-env", {
                                    targets: {
                                        browsers: [
                                            "Edge >= 16",
                                            "Firefox >= 60",
                                            "Chrome >= 61",
                                            "Safari >= 11",
                                            "Opera >= 48"
                                        ]
                                    },
                                    bugfixes: true,
                                    useBuiltIns: false,
                                }]
                            ]
                        }
                    }
                }
            ]
        }
    }*/
];