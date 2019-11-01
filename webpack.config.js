const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  target: 'web',
  devtool: 'false',
  mode: 'production',
  entry: {
    app: 'app/web/page/app/index.js'
  },
  dll:['react','react-dom','react-router-dom', 'antd', 'markdown-it'],
  plugins:[
    { serviceworker: true },
    '@babel/plugin-transform-runtime',
    new webpack.optimize.SplitChunksPlugin({
      // chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      chunks:function(chunk){
        // 这里的name 可以参考在使用`webpack-ant-icon-loader`时指定的`chunkName`
        return chunk.name !== 'antd-icons'; 
      },
      vendors: {
        filename: '[name].bundle.js'
      }
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip',//算法
      test:  /\.js$|\.css$|\.html$/,
      threshold: 10240,//只处理比这个值大的资源。按字节计算
      minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
    }),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/
    )
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: 'less-loader', // compiles Less to CSS
        use: {
          loader:'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-0'],
            plugins: [
              ['import', [{ libraryName: 'antd', style: true }]]
            ]
          }
        }
      },
      {
        use: {
          loader:'webpack-ant-icon-loader',
          enforce: 'pre',
          // options:{
          //   chunkName:'antd-icons'
          // },
          include:[
            require.resolve('@ant-design/icons/lib/dist')
          ]
        }
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
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        // chunks:'all',
        chunks:function(chunk){
          // 这里的name 可以参考在使用`webpack-ant-icon-loader`时指定的`chunkName`
          return chunk.name !== 'antd-icons'; 
        },
        vendors: {
          filename: '[name].bundle.js'
        }
      }
    }
  },
  externals: {
    'antd/lib/table': 'antd.Table'
  }
};
