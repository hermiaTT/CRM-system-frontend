const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'index.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(sass|less|css)$/,
        use: ["style-loader", "css-loader", 'sass-loader'],
      },
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    static: path.join(__dirname, 'public'), // Webpack 5 uses 'static' instead of 'contentBase'
    watchFiles: ['src/**/*', 'public/**/*'], // Use 'watchFiles' to watch specific files or directories
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure Webpack resolves both .js and .jsx extensions
  },
};
