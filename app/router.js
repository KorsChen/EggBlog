
module.exports = app => {
  app.get('/', app.controller.home.index);
  app.get('/about', app.controller.home.index);
  app.get('/article/:articleID/read', app.controller.home.article);
  app.get('/article/:articleID/edit', app.controller.home.edit);
  app.get('/article/new', app.controller.home.newArticle);
  app.get('/logout', app.controller.home.logout);

  app.post('/login', app.controller.home.login);
  app.post('/article/save', app.controller.home.save);
  app.post('/delete/:articleID', app.controller.home.delete);
};
