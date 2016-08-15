const autoprefixer = require('autoprefixer');

module.exports = {
  entry: "js/app.js",
  output: {
    path: "public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      { 
        test: /styles\/.scss$/, 
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  },
  postcss: [
    autoprefixer(['last 2 versions']),
  ],
  resolve: {
    root: [
      process.cwd(),
    ],
  },
  watchOptions: {
    poll: true
  }
};