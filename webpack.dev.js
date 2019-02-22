var path = require('path');

module.exports = {
  mode: "development",
  entry: {
    "doc-oc": "./src/index.js"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "src")
        ],
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    filename: "[name].dev.js",
    path: path.resolve(__dirname, '.')
  }
};
