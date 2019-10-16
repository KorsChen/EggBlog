module.exports = {
  target: 'web',
  entry: {
    app: 'app/web/page/app/index.js',
    article: 'app/web/page/article/index.js',
    list: 'app/web/page/list/index.jsx'
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
  }
};
