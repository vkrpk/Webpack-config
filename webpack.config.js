const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development', // production
  entry: {
    main: path.resolve(__dirname, 'src/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: '[name][ext]',
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 5001, //default 8000
    open: true,
    hot: true,
  },
  // loaders
  module: {
    rules: [
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/i,
        type: 'asset/resource',
        generator: {
          //filename: 'fonts/[name]-[hash][ext][query]'
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          // Save the CSS as a separate file to allow caching
          MiniCssExtractPlugin.loader,
          {
            // Translate CSS into CommonJS modules
            loader: 'css-loader',
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  function () {
                    return [require('autoprefixer')]
                  },
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      //css
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      // },
      //images
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
      //js for babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Just a Demo',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/temp.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
}
