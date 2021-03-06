const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') 
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  target: 'web',
  devtool: 'false',
  mode: 'production',
  entry: {
    app: 'app/web/page/app/index.js'
  },
  dll:[
    {
      name: 'react',
      lib: [
        'react',
        'react-dom',
        'react-redux',
        'react-router',
        'react-router-config',
        'react-router-dom',
        'react-router-redux',
        'react-router-transition',
        'react-scroll-sync'
      ],
      include:[],
      exclue: []
    },
    {
      name: 'markdown',
      lib: [
        'markdown-it',
        'markdown-it-abbr',
        'markdown-it-anchor',
        'markdown-it-deflist',
        'markdown-it-imsize',
        'markdown-it-mark',
        'markdown-it-sub',
        'markdown-it-sup',
        'markdown-it-table-of-contents',
        'markdown-it-task-lists'
      ],
      include:[],
      exclue: []
    },
    {
      name: 'other',
      lib: [
        'redux',
        'redux-logger',
        'redux-thunk',
        'axios'
      ],
      include:[],
      exclue: []
    }
  ],
  plugins:[
    { serviceworker: true },
    '@babel/plugin-transform-runtime',
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({ // 打包输出HTML
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp:/\.css$/g,
      cssProcessor:require('cssnano'),
      cssProcessorPluginOptions:{
        preset:['default',{discardComments:{removeAll:true}}]
      },
      canPrint:true
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
    ),
    new LodashModuleReplacementPlugin
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
    namedModules: true,
    namedChunks: true,
    runtimeChunk: { 
      name: 'runtime' 
    },
    splitChunks:
    {
      name: false,
      chunks: 'all',
      minSize: 1,
      minChunks: 1,
      cacheGroups:
      {
        default: false,
        vendors:
        {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          test: /node_modules/
        },
        styles:
        {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          test: /\.(css|less|scss|stylus)$/,
          enforce: true,
          priority: 50
        }
      }
    }
  },
  externals: {
    'antd/lib/table': 'antd.Table'
  }
};
