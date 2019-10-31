const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');

module.exports = {
  target: 'web',
  devtool: 'false',
  mode: 'production',
  entry: {
    app: 'app/web/page/app/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
      /zh-cn/,
    )
    // ,new BundleAnalyzerPlugin({
    //   //  可以是`server`，`static`或`disabled`。
    //   //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
    //   //  在“静态”模式下，会生成带有报告的单个HTML文件。
    //   //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
    //   analyzerMode: 'server',
    //   //  将在“服务器”模式下使用的主机启动HTTP服务器。
    //   analyzerHost: '127.0.0.1',
    //   //  将在“服务器”模式下使用的端口启动HTTP服务器。
    //   analyzerPort: 8888, 
    //   //  路径捆绑，将在`static`模式下生成的报告文件。
    //   //  相对于捆绑输出目录。
    //   reportFilename: 'report.html',
    //   //  模块大小默认显示在报告中。
    //   //  应该是`stat`，`parsed`或者`gzip`中的一个。
    //   //  有关更多信息，请参见“定义”一节。
    //   defaultSizes: 'parsed',
    //   //  在默认浏览器中自动打开报告
    //   openAnalyzer: true,
    //   //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
    //   generateStatsFile: false, 
    //   //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
    //   //  相对于捆绑输出目录。
    //   statsFilename: 'stats.json',
    //   //  stats.toJson（）方法的选项。
    //   //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
    //   //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    //   statsOptions: null,
    //   logLevel: 'info' //日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
    // })
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
