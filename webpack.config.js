const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const config = {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      historyApiFallback: true,
      inline: true,
      port: 4000
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader'
        },
        {
          enforce: 'pre',
          test: /\.(ts|tsx)$/,
          loader: 'tslint-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          oneOf: [
            {
              test: /\.css$/,
              loader: 'style-loader!css-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: 'public/index.html'
      })
    ]
  };
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  }
  return config;
};
