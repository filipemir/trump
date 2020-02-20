const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    postcssPresetEnv = require('postcss-preset-env'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
    PrettierPlugin = require("prettier-webpack-plugin"),
    webpack = require("webpack"),
    MinifyPlugin = require("babel-minify-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin');

require('dotenv').config();

const isDev = !process.env.ENV || process.env.ENV === "development",
  plugins = [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      GA_TRACKING_ID: JSON.stringify(process.env.GA_TRACKING_ID),
      SITE_URL: JSON.stringify(process.env.SITE_URL)
    }),
    new PrettierPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.pug'
    }),
    new MiniCssExtractPlugin({
      filename: '[hash].css'
    }),
    new FaviconsWebpackPlugin('./src/img/face.png')
  ],
  postCssLoaderPlugins = [postcssPresetEnv()];

if (!isDev) {
  plugins.push(new MinifyPlugin());

  postCssLoaderPlugins.push(require('cssnano')());
}

module.exports = {
  entry: './src/js/index.js',
  mode: process.env.ENV || "development",
  devtool: isDev ? "source-map" : false,
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      { 
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(s)?css$/,
        use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { sourceMap: isDev } },
            {
                loader: 'postcss-loader', options: {
                    sourceMap: isDev,
                    plugins: postCssLoaderPlugins
                }
            },
            { loader: "sass-loader", options: { sourceMap: isDev } },
        ]
    },
    {
        test: /\.(mp3|woff(2)?|ttf|eot|svg|png|jp(e)?g)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
            loader: "file-loader",
            options: {
                name: "[hash].[ext]",
            }
        }
    },
    {
      test: /src\/public\/.*$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        }
      }
    }
    ]
  },
  plugins
};