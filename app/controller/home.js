const Model = require('../mocks/article/list');
const crypto = require('crypto');
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

      const endIndex = url.indexOf('/read');
      const articleID = url.substring(9, endIndex);
      const escapeID = app.mysql.escape(articleID);
      const queryAction = 'SELECT * FROM article WHERE articleID=' + escapeID;
      const articles = await app.mysql.query(queryAction);
      const article = articles[0];
      if (article) {
        let { articleTime } = article;
        const year = articleTime.getFullYear();
        const month = articleTime.getMonth() + 1 > 10 ? articleTime.getMonth() : '0' + (articleTime.getMonth() + 1);
        const date = articleTime.getDate() > 10 ? articleTime.getDate() : '0' + articleTime.getDate();
        articleTime = year + '-' + month + '-' + date;
        console.log('articleID-----------------' + JSON.stringify(articleTime));
      }
      await ctx.renderClient('app.js', { article, user: session.user });
    }

    async login() {
      const { ctx } = this;
      const { request, req, response } = ctx;
      const { query, session } = req;

      const name = request.body.name;
      let password = request.body.password;
      if (!name || !password) return;
      const hash = crypto.createHash('md5');
      hash.update(password);
      password = hash.digest('hex');
      const queryUser = 'SELECT * FROM author WHERE authorName=' + app.mysql.escape(name) + ' AND authorPassword=' + app.mysql.escape(password);
      const users = await app.mysql.query(queryUser);
      const user = users[0];

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

      if(user) {
        console.log('login-----------------' + JSON.stringify(ctx));
        await ctx.renderClient('app.js', { 
          articles,
          user,
          isLoggedIn: true,
          pageNum,
          page
        },);
      }
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