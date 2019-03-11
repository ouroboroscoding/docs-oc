var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: {
    "docs-oc": "./src/index.js"
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
    path: path.resolve(__dirname, '.'),
    libraryTarget: "var",
    library: "Docs"
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "Docs-OC\n\nA JSON/React based documentation system for libraries available in multiple\nprogramming languages\n\n@author Chris Nasr\n@copyright OuroborosCoding\n@created 2019-02-16",
      entryOnly: true
    })
  ],
  watch: true
};
