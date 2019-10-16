
const Model = require('../mocks/article/list');
module.exports = app => {
  return class AppController extends app.Controller {
    async article() {
      console.log('articleID-----------------' + escapeID);
      const { ctx: { req } } = this;
      const { params, session = {} } = req;
      const { articleID } = params;
      const escapeID = app.mysql.escape(articleID);
      console.log('articleID-----------------' + escapeID);
      const query = 'SELECT * FROM article WHERE articleID=' + app.mysql.escape(escapeID);
      const articles = await app.mysql.query(query);
      const article = articles[0];
      const { articleTime } = aritcle;
      const year = articleTime.getFullYear();
      const month = articleTime.getMonth() + 1 > 10 ? articleTime.getMonth() : '0' + (articleTime.getMonth() + 1);
      const date = articleTime.getDate() > 10 ? articleTime.getDate() : '0' + articleTime.getDate();
      articleTime = year + '-' + month + '-' + date;
      await ctx.renderClient('article.js', { article, user: session.user });
    }
  };
};