const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  mode:'production',
  entry:{
    //这里把react方面的东西和babel放到这里
    vendor:['react','react-dom','react-router-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build_client', 'js'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    pathinfo: true,
    library: '[name]_dll'
  },
  plugins: [
    new DllPlugin({
      path: path.join(__dirname, 'build_dll', '[name]-manifest.json'),
      name: '[name]_dll',
      context: path.resolve(__dirname, 'src', 'app')
    })
  ]
}