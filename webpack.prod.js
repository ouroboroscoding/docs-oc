var path = require('path');

module.exports = {
  mode: "production",
  entry: {
    "docs-oc": "./src/index.js"
  },
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
    filename: "[name].js",
    path: path.resolve(__dirname, '.'),
    libraryTarget: "var",
    library: "Docs"
  }
};
