
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/about', app.controller.home.index);
  app.get('/article/:articleID', app.controller.home.article);
  app.get('/list', app.controller.home.list);
  app.get('/api/article/list', app.controller.home.pager);
};
