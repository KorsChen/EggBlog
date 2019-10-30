const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    app: 'app/web/page/app/index.js'
  },
  plugins:[
    { serviceworker: true },
    '@babel/plugin-transform-runtime',
    new CompressionPlugin({
      filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip',//算法
      test: new RegExp(
        '\\.(js|css)$'    //压缩 js 与 css
      ),
      threshold: 10240,//只处理比这个值大的资源。按字节计算
      minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
    })
  
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
  },
  devServer:{
    contentBase:'./',
    historyApiFallback: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
