module.exports = {
  output: {
    filename: "main.js",
    publicPath: "/static/frontend/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|gif|jpe?g)$/,
        use: [
          {
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
            },
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
