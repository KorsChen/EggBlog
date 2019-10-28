
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/about', app.controller.home.index);
  app.get('/article/:articleID/read', app.controller.home.article);

  app.post('/login', app.controller.home.login);
  app.get('/article/new', app.controller.home.newArticle);
  app.post('/edit', app.controller.home.edit);
};
