const Model = require('../mocks/article/list');
module.exports = app => {
  return class AppController extends app.Controller {
    async index() {
      const { ctx } = this;
      const { req, url } = ctx;
      const { query, session } = req;

      const page = (query && query.page) ? query.page : 1;
      const start = (page - 1) * 8;
      const end = page * 8;
      const queryCount = 'SELECT COUNT(*) AS articleNum FROM article';
      // 新加的文章展示在最前面，一页8篇文章
      const queryArticles = 'SELECT * FROM article ORDER BY articleID DESC LIMIT ' + start + ',' + end;
      const articles = await app.mysql.query(queryArticles);
      articles.forEach((ele) => {
        const year = ele.articleTime.getFullYear();
        const month = ele.articleTime.getMonth() + 1 > 10 ? ele.articleTime.getMonth() : '0' + (ele.articleTime.getMonth() + 1);
        const date = ele.articleTime.getDate() > 10 ? ele.articleTime.getDate() : '0' + ele.articleTime.getDate();
        ele.articleTime = year + '-' + month + '-' + date;
      });

      const rows = await app.mysql.query(queryCount);
      const articleNum = rows[0].articleNum;
      const pageNum = Math.ceil(articleNum / 8);
      await ctx.renderClient('app.js', { 
        url,
        articles,
        user:session ? session.user : '',
        pageNum,
        page
      },);
    }

    async article() {
      const { ctx } = this;
      const { request, req: { session = {} } } = ctx;
      const { url = '' } = request;

      const index = url.lastIndexOf('\/');
      const articleID = url.substring(index + 1, url.length);
      const escapeID = app.mysql.escape(articleID);
      console.log('articleID-----------------' + escapeID);
      const queryAction = 'SELECT * FROM article WHERE articleID=' + escapeID;
      const articles = await app.mysql.query(queryAction);
      const article = articles[0];
      let { articleTime } = article;
      const year = articleTime.getFullYear();
      const month = articleTime.getMonth() + 1 > 10 ? articleTime.getMonth() : '0' + (articleTime.getMonth() + 1);
      const date = articleTime.getDate() > 10 ? articleTime.getDate() : '0' + articleTime.getDate();
      articleTime = year + '-' + month + '-' + date;
      console.log('articleID-----------------' + JSON.stringify(articleTime));
      await ctx.renderClient('article.js', { article, user: session.user });
    }

    async list() {
      const { ctx } = this;
      await ctx.renderClient('list.js', Model.getPage(1, 10));
    }

    async client() {
      const { ctx } = this;
      await ctx.renderClient('list.js', Model.getPage(1, 10));
    }

    async pager() {
      const { ctx } = this;
      const pageIndex = ctx.query.pageIndex;
      const pageSize = ctx.query.pageSize;
      ctx.body = Model.getPage(pageIndex, pageSize);
    }
  };
};