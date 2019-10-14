module.exports = {
  target: 'web',
  entry: {
    app: 'app/web/page/app/index.js',
    list: 'app/web/page/list/index.jsx'
  },
  plugins:[
    { serviceworker: true }
  ]
};
