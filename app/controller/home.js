const Model = require('../mocks/article/list');
module.exports = app => {
  return class AppController extends app.Controller {
    async index() {
      const { ctx } = this;
      const { req } = ctx;
      const page = (req.query && req.query.page) ? req.query.page : 1;
      const start = (page - 1) * 8;
      const end = page * 8;
      const queryCount = 'SELECT COUNT(*) AS articleNum FROM article';
      // 新加的文章展示在最前面
      const query = 'SELECT * FROM article ORDER BY articleID DESC LIMIT ' + start + ',' + end;

      await app.mysql.query(query, (err, rows) => {
        const articles = rows;
        articles.forEach((ele) => {
          const year = ele.articleTime.getFullYear();
          const month = ele.articleTime.getMonth() + 1 > 10 ? ele.articleTime.getMonth() : '0' + (ele.articleTime.getMonth() + 1);
          const date = ele.articleTime.getDate() > 10 ? ele.articleTime.getDate() : '0' + ele.articleTime.getDate();
          ele.articleTime = year + '-' + month + '-' + date;
        });
        app.mysql.query(queryCount, (err, rows) => {
          const articleNum = rows[0].articleNum;
          const pageNum = Math.ceil(articleNum / 8);
          ctx.render('app.js', { 
            url: ctx.url,
            articles,
            user:req.session.user,
            pageNum,
            page
          });
        });
      });
    }

    async list() {
      const { ctx } = this;
      await ctx.render('list.js', Model.getPage(1, 10));
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