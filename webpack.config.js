module.exports = {
  target: 'web',
  entry: {
    app: 'app/web/page/app/index.js'
  },
  plugins:[
    { serviceworker: true },
    '@babel/plugin-transform-runtime'
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: 'less-loader' // compiles Less to CSS
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
