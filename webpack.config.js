const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require("webpack");
const dotenv = require('dotenv');

module.exports = (env, options) => {

  const envPath = `${path.join(__dirname)}/.env.${options.mode}`;
  const fileEnv = dotenv.config({ path: envPath }).parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: "/src/App.js",
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        { 
          test: /\.css$/, 
          use: [ 'style-loader', 'css-loader' ] 
        }
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({ template: "./src/index.html" }),
      new webpack.DefinePlugin(envKeys)
    ],
    devServer: {
      historyApiFallback: true
    }
  }
};
