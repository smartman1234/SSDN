const path = require("path");

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
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
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          "file-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    hot: true,
    open: true,
  },
  optimization: {
    cache: {
      type: "filesystem",
      maxAge: 60 * 60 * 24 * 365 // 1 year
    }
  }
};