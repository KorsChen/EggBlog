const Model = require('../mocks/article/list');
const crypto = require('crypto');

module.exports = app => {
  return class AppController extends app.Controller {
    async index() {
      const { ctx } = this;
      const { req, url, session } = ctx;
      // const { query } = req;
      // const page = (query && query.page) ? query.page : 1;
      // const start = (page - 1) * 8;
      // const end = page * 8;
      // const queryCount = 'SELECT COUNT(*) AS articleNum FROM article';
      // // 新加的文章展示在最前面，一页8篇文章
      // const queryArticles = 'SELECT * FROM article ORDER BY articleID DESC LIMIT ' + start + ',' + end;
      const queryArticles = 'SELECT * FROM article ORDER BY articleID DESC';
      const articles = await app.mysql.query(queryArticles);
      articles.forEach((ele) => {
        const year = ele.articleTime.getFullYear();
        const month = ele.articleTime.getMonth() + 1 >= 10 ? ele.articleTime.getMonth() + 1 : '0' + (ele.articleTime.getMonth() + 1);
        const date = ele.articleTime.getDate() >= 10 ? ele.articleTime.getDate() : '0' + ele.articleTime.getDate();
        ele.articleTime = year + '-' + month + '-' + date;
      });

      // const rows = await app.mysql.query(queryCount);
      // const articleNum = rows[0].articleNum;
      // const pageNum = Math.ceil(articleNum / 8);
      await ctx.renderClient('app.js', { 
        url,
        articles,
        isLoggedIn: session.user ? true : false
      },);
    }

    async article() {
      const { ctx } = this;
      const { request, session } = ctx;
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
        const month = articleTime.getMonth() + 1 >= 10 ? articleTime.getMonth() + 1 : '0' + (articleTime.getMonth() + 1);
        const date = articleTime.getDate() >= 10 ? articleTime.getDate() : '0' + articleTime.getDate();
        articleTime = year + '-' + month + '-' + date;
      }
      await ctx.renderClient('app.js', { article, isLoggedIn: session.user ? true : false });
    }

    async login() {
      const { ctx } = this;
      const { request, req, response, session } = ctx;
      const { query } = req;
      const name = request.body.name;
      let password = request.body.password;
      if (!name || !password) return;
      const hash = crypto.createHash('md5');
      hash.update(password);
      password = hash.digest('hex');
      const queryUser = 'SELECT * FROM author WHERE authorName=' + app.mysql.escape(name) + ' AND authorPassword=' + app.mysql.escape(password);
      const users = await app.mysql.query(queryUser);
      const user = users[0];

      const queryArticles = 'SELECT * FROM article ORDER BY articleID DESC';
      const articles = await app.mysql.query(queryArticles);
      articles.forEach((ele) => {
        const year = ele.articleTime.getFullYear();
        const month = ele.articleTime.getMonth() + 1 > 10 ? ele.articleTime.getMonth() : '0' + (ele.articleTime.getMonth() + 1);
        const date = ele.articleTime.getDate() > 10 ? ele.articleTime.getDate() : '0' + ele.articleTime.getDate();
        ele.articleTime = year + '-' + month + '-' + date;
      });

      if(user) {
        ctx.session.user = user;
        await ctx.renderClient('app.js', { 
          articles,
          isLoggedIn: true
        },);
      }
    }

    async newArticle() {
      const { ctx } = this;
      const { request, req, response } = ctx;
      const insert = 'INSERT article SET articleTitle=' + app.mysql.escape('无') +
      ',articleAuthor=' + app.mysql.escape('KorsChen') +
      ',articleContent=' + app.mysql.escape('未编辑') + ',articleTime=CURDATE()';
      const article = await app.mysql.query(insert);
      const { insertId } = article;
      if (insertId) {
        await ctx.renderClient('app.js', { articleID: insertId });
      }
    }

    async edit() {
      const { ctx } = this;
      const { request, session } = ctx;
      const { url = '' } = request;
      if (session.user) {
        const endIndex = url.indexOf('/edit');
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
        }
        await ctx.renderClient('app.js', { article, isLoggedIn: true });
      }
    }

    async save() {
      const { ctx } = this;
      const { request, req, response } = ctx;
      const { 
        id,
        author,
        markdown='',
        title,
        tags='',
        excerpt='', 
        coverUrl=''
      } = request.body;

      const update = 'UPDATE article SET articleTitle=' + app.mysql.escape(title) +
      ',articleContent=' + app.mysql.escape(markdown) +
      // ',articleTime=' + app.mysql.escape(new Date().toJSON()) +
      ',articleExcerpt=' + app.mysql.escape(excerpt) +
      ',articleTags=' + app.mysql.escape(tags) +
      ',articleCoverUrl=' + app.mysql.escape(coverUrl) +
      ',articleAuthor=' + app.mysql.escape(author) +
      ' WHERE articleID=' + app.mysql.escape(id);
      const article = await app.mysql.query(update);
      await ctx.renderClient('app.js');
    }

    async delete() {
      const { ctx } = this;
      const { request, response, session } = ctx;
      const { articleID } = request.body;
      if (session.user && articleID) {
        const del = 'DELETE FROM article WHERE articleID=' + app.mysql.escape(articleID);
        await app.mysql.query(del);
        await ctx.renderClient('app.js');
      }
    }

    async logout() {
      const { ctx } = this;
      const { session } = ctx;
      session.user = undefined;
      await ctx.renderClient('app.js', { 
        isLoggedIn: false
      },);
    }
  };
};